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
mongoose.connect('mongodb://192.168.10.148/tw-prod-10-09-2017');
//mongoose.connect('mongodb://192.168.10.121/tw-prod-20170928');



//var temp = mongoose.model('temps',new mongoose.Schema({}, {strict: false}));
//var temp = mongoose.model('report1',new mongoose.Schema({});
// var org = mongoose.model('TXN_Organization',new mongoose.Schema({
//   "parentId": {
//         "type": Schema.Types.ObjectId,
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
   //      "type": Schema.Types.ObjectId,
   //      "ref": 'MST_RefCodeValue'
   //  }
});
orgScgema.plugin(mongooseAggregatePaginate);


var org1 = mongoose.model('TXN_Organization',orgScgema);
//Schema.Types.ObjectId()
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
          "directoryId" : new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3"), 
          "status" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb"), 
          "active" : true, 
          "deleted" : false, 
          "personnel" : {
              "$exists" : true, 
              "$ne" : [
      
              ]
          }
      }
    },

    // Stage 2
    {
      $project: { 
          "abbrevationName" : 1, 
          "classificationCodeName" : 1, 
          "orgIdNumber" : 1, 
          "name" : 1, 
          "established.year" : 1, 
          "personnel" : {
              "$setUnion" : [
                  "$personnel", 
                  [
      
                  ]
              ]
          }
      }
    },

    //Stage 3
    {
      $sort: { 
          "orgIdNumber" : 1
      }
    },

    // Stage 4
    {
      $unwind: "$personnel"
    },

    // Stage 5
    {
      $lookup: { 
          "from" : "txn_personnels", 
          "localField" : "personnel", 
          "foreignField" : "_id", 
          "as" : "personnel"
      }
    },

    // Stage 6
    {
      $unwind: "$personnel"
    },

    // Stage 7
    {
      $match: { 
          "personnel.directoryId" : new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3"), 
          "personnel.status" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb"), 
          "$or" : [
              {
                  "personnel.died" : null
              }, 
              {
                  "personnel.died.day" : null
              }, 
              {
                  "personnel.died.month" : null
              }, 
              {
                  "personnel.died.year" : null
              }
          ]
      }
    },

    // Stage 8
    {
      $unwind: "$personnel.assignment"
    },

    // Stage 9
    {
      $match: { 
          "personnel.assignment.status" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 10
    {
      $lookup: { 
          "from" : "txn_organizations", 
          "localField" : "personnel.assignment.orgId", 
          "foreignField" : "_id", 
          "as" : "personnel.assignment.orgId"
      }
    },

    // Stage 11
    {
      $unwind: "$personnel.assignment.orgId"
    },

    // Stage 12
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "personnel.personType", 
          "foreignField" : "_id", 
          "as" : "personnel.personType"
      }
    },

    // Stage 13
    {
      $unwind: "$personnel.personType"
    },

    // Stage 14
    {
      $lookup: { 
          "from" : "txn_organizations", 
          "localField" : "personnel.assignment.orgId.parentId", 
          "foreignField" : "_id", 
          "as" : "personnel.assignment.orgId.parentId"
      }
    },

    // Stage 15
    {
      $unwind: "$personnel.assignment.orgId.parentId"
    },

    // Stage 16
    {
      $match: { 
          "personnel.assignment.orgId.classificationCode" : {
              "$nin" : [
                  new mongoose.Types.ObjectId("57726c33c19c305dc5b1b36c"), 
                  new mongoose.Types.ObjectId("57726c33c19c305dc5b1b34f")
              ]
          }
      }
    },

    // Stage 17
    {
      $project: { 
          "abbrevationName" : 1, 
          "classificationCodeName" : 1, 
          "orgIdNumber" : 1, 
          "name" : 1, 
          "established.year" : 1, 
          "personnel.assignment.assignId" : 1, 
          "personnel.assignment.assignType" : 1, 
          "personnel.assignment.status" : 1, 
          "personnel.personType.description" : 1, 
          "personnel.PeopleId" : 1, 
          "personnel.very" : 1, 
          "personnel.title" : 1, 
          "personnel.name.prefix" : 1, 
          "personnel.name.first" : 1, 
          "personnel.name.middle" : 1, 
          "personnel.name.last" : 1, 
          "personnel.name.suffix" : 1, 
          "personnel.religiousOrderInitials" : 1, 
          "personnel.assignment.title" : 1, 
          "personnel.retired" : 1, 
          "personnel.ordination.ordination_year" : 1, 
          "personnel.homeDiocese" : 1, 
          "personnel.homeNation" : 1, 
          "personnel.assignment.orgId.orgIdNumber" : 1, 
          "personnel.assignment.orgId.name" : 1, 
          "personnel.assignment.orgId.parentId.orgIdNumber" : 1, 
          "personnel.assignment.orgId.parentId.name" : 1, 
          "personnel.died" : 1, 
          "cmp" : {
              "$cmp" : [
                  "$orgIdNumber", 
                  "$personnel.assignment.orgId.orgIdNumber"
              ]
          }
      }
    },

    // Stage 18
    {
      $match: { 
          "cmp" : 0
      }
    }
  ]

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

);

 console.log("count_",count);
var options = { page : count, limit : 5000, allowDiskUse: true }
org1.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
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

function fun2(data,cb){
  console.log("function2");
  data.aggregate([
    {
      $sort: { 
          "orgIdNumber" : 1
      }
    }
    ]).exec(function(err,res){
    cb(null,res);
  })
}

function result(err, result) {
  console.log("result");
    var fields = [
    '_id'
    // {
    //   label: 'status.codeValue', 
    //   value: function(row, field, data) {
    //       var _data =JSON.parse(JSON.stringify(row));
    //       return ((_data.status) && (_data.status.codeValue)) ?(_data.status.codeValue):"";
    //     //return JSON.parse(JSON.stringify(row.status)).codeValue;
    //   },
    //   default: 'NULL',
    //   stringify: true 
    // },'orgIdNumber','name'

    ];
    var csv = json2csv({ data: result, fields: fields }); 
 //     fs.writeFile('file2.csv', csv, function(err) {
//  fs.appendFile('file3.csv', csv, function(err) {
     fs.appendFile('OCDPER.csv', csv, function(err) {
        if (err) throw err;
        else
        {
          count = count + 1;
          if(count <= 15)
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