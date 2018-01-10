var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsonexport = require('jsonexport');
var json2csv = require('json2csv');
var fs = require('fs');
var async = require('async');
//var _ = require('loadash');

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate-allowdiskuse');
 

var count=1;
//mongoose.connect('mongodb://192.168.10.178/OCD_XML');
mongoose.connect('mongodb://192.168.10.82/tw-prod-20171216');
//mongoose.connect('mongodb://192.168.10.121/tw-prod-20170928');



//var temp = mongoose.model('temps',new mongoose.Schema({}, {strict: false}));
//var temp = mongoose.model('report1',new mongoose.Schema({});
// var org = mongoose.model('TXN_Organization',new mongoose.Schema({
//   "parentId": {
//         "type": Schema.Types.new mongoose.Types.ObjectId,
//         "ref": 'TXN_Organization'
//     }
// }));
var mstValue = mongoose.model('MST_RefCodeValue',new mongoose.Schema({}));
var orgScgema = new mongoose.Schema({
  'parentId':{
        "type": Schema.Types.ObjectId,
        "ref": 'TXN_Organization'
    }
   // "classificationCode":{
   //      "type": Schema.Types.new mongoose.Types.ObjectId,
   //      "ref": 'MST_RefCodeValue'
   //  }
});
orgScgema.plugin(mongooseAggregatePaginate);


var org1 = mongoose.model('TXN_Organization',orgScgema);
//Schema.Types.new mongoose.Types.ObjectId()
//db.ocdpersonnels.find({}).sort({orgIdNumber:1}).limit(100)
function jsontoCsv(data)
{
      var fileName=new Date().getTime().toString()+".csv";
      jsonexport(JSON.parse(JSON.stringify(data)),function(err, csv){
          if(err) return console.log(err);
          fs.writeFile(fileName,csv, function(err2) {
          if(err2) {
              return console.log(err2);
          }
          console.log("The file was saved!",fileName);
      });
      });

 }

function fun1(callback){
  console.log("func1");
 var aggregate=org1.aggregate(
  // Pipeline
   [
    // Stage 1
    {
      $match: {
    "directoryId":new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3"),
      "status" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb"),
      "classificationCode":{$in:[
        new mongoose.Types.ObjectId("57726c33c19c305dc5b1b352"),
        new mongoose.Types.ObjectId("57726c33c19c305dc5b1b353")]},
         $or: [ { "address": { $size: 0 } }, 
         { "address": null } ] 
      }
    },
    {
      $sort: { 
          "orgIdNumber" : 1
      }
    },
    // // Stage 2
    // {
    //   $unwind: {
    //         path: "$address",
    //         preserveNullAndEmptyArrays:true
    //   }
    // },

    // // Stage 3
    // {
    //   $match: {
    //   "address.addressType":
    //   {
    //     $in:
    //     [
    //     new mongoose.Types.ObjectId("57726e42c19c3451796ea55f"),
    //     new mongoose.Types.ObjectId("57726e42c19c3451796ea562")
    //     ]}
    //   }
    // },

    // Stage 4
    {
      $project: {
         "status":1,
         "orgIdNumber":1,
         "classificationCodeName":1,
         "name":1,
         "address.addressType":1,
         "address.sequenceNo":1,
         "address.mailingIndex":1,
         "address.header":1,
         "address.organizationName":1,
         "address.street1":1,
         "address.street2":1,
         "address.cityName":1,
         "address.stateAbbreviation":1,
         "address.zip":1,
         "address.countyName":1,
         "parentId":1,
          "abbrevationName":1,
         "EINumber":1,
         "dioProvinceName":1
       }
    },

    // Stage 5
    {
      $lookup: {
          "from" : "txn_organizations",
          "localField" : "parentId",
          "foreignField" : "_id",
          "as" : "parentId"
      }
    },

    // Stage 6
    {
      $unwind: "$parentId"
    },

    // Stage 7
    {
      $project: {
         "status":1,
         "orgIdNumber":1,
         "name":1,
         "classificationCodeName":1,
         "address.addressType":1,
         "address.sequenceNo":1,
         "address.mailingIndex":1,
         "address.header":1,
         "address.organizationName":1,
         "address.street1":1,
         "address.street2":1,
         "address.cityName":1,
         "address.stateAbbreviation":1,
         "address.zip":1,
         "address.countyName":1,
         "parentId.classificationCodeName":1,
         "parentId.org_id":1,
         "parentId.name":1,
         "abbrevationName":1,
         "EINumber":1,
         "dioProvinceName":1
         }
    }
  ]

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

);

 console.log("count_",count);
var options = { page : count, limit : 5000, allowDiskUse: true }
org1.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
  console.log("*************************************************");
  console.log("pageCount_",pageCount);
  if(err) 
  {
    console.err(err)
  }
  else
  { 
    console.log(pageCount);
  callback(null, results);
  }
}) 
}



function result(err, result) {
  console.log("result");
    var fields = [
         "status",
         "orgIdNumber",
         "name",
         
        "abbrevationName",
        "EINumber",
         "classificationCodeName",
         
         "address.sequenceNo",
         "address.addressType",
         
         "address.mailingIndex",
         "address.header",
         "address.organizationName",
         "address.street1",
         "address.street2",
         "address.cityName",
         "address.stateAbbreviation",
    //     "address.zip",
             {
      label: 'zip', 
      value: function(row, field, data) {
          var _data =JSON.parse(JSON.stringify(row));
          return ((_data.address) && (_data.address.zip)) ?('zip:-'+_data.address.zip):"";
        //return JSON.parse(JSON.stringify(row.status)).codeValue;
      },
      default: 'NULL',
      stringify: true 
    },
         "address.countyName",
         "dioProvinceName",
         "parentId.org_id",
         "parentId.classificationCodeName",
         "parentId.name",
      

    // {
    //   label: 'status.codeValue', 
    //   value: function(row, field, data) {
    //       var _data =JSON.parse(JSON.stringify(row));
    //       return ((_data.status) && (_data.status.codeValue)) ?(_data.status.codeValue):"";
    //     //return JSON.parse(JSON.stringify(row.status)).codeValue;
    //   },
    //   default: 'NULL',
    //   stringify: true 
    // }

    ];
    var csv = json2csv({ data: result, fields: fields }); 
 //     fs.writeFile('file2.csv', csv, function(err) {
//  fs.appendFile('file3.csv', csv, function(err) {
     fs.appendFile('20171218_ADDRESS_NULL.csv', csv, function(err) {
        if (err) throw err;
        else
        {
          count = count + 1;
          if(count <= 1)
          show();          
        else 
          console.log("done");
        }
      });
}


var show = function(){
  async.waterfall([fun1],result );          
}
new Promise(function(){

})
    show();