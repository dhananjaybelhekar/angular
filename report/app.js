var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsonexport = require('jsonexport');
var json2csv = require('json2csv');
var fs = require('fs');
var async = require('async');

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate-allowdiskuse');
 

var count=1;
//mongoose.connect('mongodb://192.168.10.178/OCD_XML');
mongoose.connect('mongodb://192.168.10.178/tw-prod-03-10-2017');
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
       "directoryId": new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3"),
         "status" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 2
    {
      $sort: {
      "orgIdNumber":1
      }
    },
    {
      $unwind: "$address"
    },

    // Stage 3
    {
      $match: {
      "address.deleted":{$in:[false,null]}
      }
    },

    // Stage 4
    {
      $project: {
      "status":1,
      "orgIdNumber":1,
      "classificationCode":1,
      "name":1,
      "address":1,
      "parentId":1
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
 
function fun2(data,callback){
  console.log("func2");
            //callback(null,data);
  org1.populate(data, {path: 'parentId'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}
function fun3(data,callback){
  console.log("func3");
            //callback(null,data);
  mstValue.populate(data, {path: 'status'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}
function fun4(data,callback){
  console.log("func4");
            //callback(null,data);
  mstValue.populate(data, {path: 'classificationCode'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}
function fun5(data,callback){
  console.log("func5");
            //callback(null,data);
  mstValue.populate(data, {path: 'address.addressType'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}
function fun6(data,callback){
  console.log("func6");
            //callback(null,data);
  mstValue.populate(data, {path: 'address.country'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}
function fun7(data,callback){
  console.log("func7");
            //callback(null,data);
  mstValue.populate(data, {path: 'address.city'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}
function fun8(data,callback){
  console.log("func8");
            //callback(null,data);
  mstValue.populate(data, {path: 'address.state'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}

function result(err, result) {
  console.log("result");
    var fields = [
    {
      label: 'status.codeValue', 
      value: function(row, field, data) {
          var _data =JSON.parse(JSON.stringify(row));
          return ((_data.status) && (_data.status.codeValue)) ?(_data.status.codeValue):"";
        //return JSON.parse(JSON.stringify(row.status)).codeValue;
      },
      default: 'NULL',
      stringify: true 
    },'orgIdNumber','name',
    {
      label: 'classificationCode.codeValue', 
      value: function(row, field, data) {
        //return JSON.parse(JSON.stringify(row.classificationCode)).codeValue;
          var _data =JSON.parse(JSON.stringify(row));
          return ((_data.classificationCode) && (_data.classificationCode.codeValue)) ?(_data.classificationCode.codeValue):"";
      },
      default: 'NULL',
      stringify: true 
    },
    'address.sequenceNo',
    {
      label: 'address.addressType', 
      value: function(row, field, data) {
//        return JSON.parse(JSON.stringify(row.address.addressType)).codeValue;
          var _data =JSON.parse(JSON.stringify(row));
          return ((_data.address) && (_data.address.addressType) &&(_data.address.addressType.codeValue) ) ?(_data.address.addressType.codeValue):"";
      },
      default: 'NULL',
      stringify: true 
    },
    'address.mailingIndex',
    'address.header',
    'address.organizationName',
    'address.street1',
    'address.street2',
    //'address.city',
    {
      label: 'city', 
      value: function(row, field, data) {
        var data =JSON.parse(JSON.stringify(row));
            return (data.address.city) && (data.address.city.codeValue) ?(data.address.city.codeValue):"";
      },
      default: 'NULL',
      stringify: true 
    },
   // 'address.state',
   {
      label: 'state', 
      value: function(row, field, data) {
        var data =JSON.parse(JSON.stringify(row));
            return (data.address.state) && (data.address.state.description) ?(data.address.state.description):"";
      },
      default: 'NULL',
      stringify: true 
    },
    'address.zip',
    //'address.country',
    {
      label: 'country', 
      value: function(row, field, data) {
        var _data =JSON.parse(JSON.stringify(row));
            return (_data.address.country) && (_data.address.country.codeValue) ?(_data.address.country.codeValue):"";
      },
      default: 'NULL',
      stringify: true 
    },
    'dioProvince',
    {
      label: 'orgIdNumber', 
      value: function(row, field, data) {
        var _data =JSON.parse(JSON.stringify(row));
        return (_data.parentId) && (_data.parentId.orgIdNumber) ?(_data.parentId.orgIdNumber):"";
      },
      default: 'NULL',
      stringify: true 
    },
    {
      label: 'parent classificationCodeName', 
      value: function(row, field, data) {
        var _data =JSON.parse(JSON.stringify(row));
        return (_data.parentId) && (_data.parentId.classificationCodeName) ?(_data.parentId.classificationCodeName):"";
      },
      default: 'NULL',
      stringify: true 
    },
    {
      label: 'parentId', 
      value: function(row, field, data) {
        var _data =JSON.parse(JSON.stringify(row));
        return (_data.parentId) && (_data.parentId.name) ?(_data.parentId.name):"";
      },
      default: 'NULL',
      stringify: true 
    }

    ];
    var csv = json2csv({ data: result, fields: fields }); 
 //     fs.writeFile('file2.csv', csv, function(err) {
//  fs.appendFile('file3.csv', csv, function(err) {
     fs.appendFile('OCDADDRESS.csv', csv, function(err) {
        if (err) throw err;
        else
        {
          count = count + 1;
          if(count < 18)
          show();          
        else 
          console.log("done");
        }
      });
}


var show = function(){
  async.waterfall([fun1,fun2,fun3,fun4,fun5,fun6,fun7,fun8],result );          
}
    show();
  

    // var x=new Promise(function(resolve, reject){

    //     async.waterfall([fun1,fun2,fun3,fun4,fun5,fun6,fun7,fun8],result );    
    //     resolve(count);
    // })
    // for(var i=0;i<17;i++)
    // {
    //       count=i;
    //       x.then(function(resp){
    //           console.log("promise",resp);
    //       },function(err){
    //           console.log(err);
    //       });

    // }


/*
db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
          "status" : ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 2
    {
      $sort: {
      "orgIdNumber":1
      }
    },

    // Stage 3
    {
      $unwind: "$address"
    },

    // Stage 4
    {
      $match: { 
          "address.deleted" : {
              "$in" : [
                  false, 
                  null
              ]
          }
      }
    },

    // Stage 5
    {
      $project: { 
          "status" : 1, 
          "orgIdNumber" : 1, 
          "classificationCode" : 1, 
          "name" : 1, 
          "address" : 1, 
          "parentId" : 1
      }
    }
  ],

  // Options
  {
    cursor: {
      batchSize: 50
    },

    allowDiskUse: true
  }

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

);
*/