var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsonexport = require('jsonexport');
var json2csv = require('json2csv');
var fs = require('fs');
var async = require('async');

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate-allowdiskuse');
 


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
var options = { page : 1, limit : 5000, allowDiskUse: true }
org1.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
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
            //callback(null,data);
  org1.populate(data, {path: 'parentId'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}
function fun3(data,callback){
            //callback(null,data);
  mstValue.populate(data, {path: 'status'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}
function fun4(data,callback){
            //callback(null,data);
  mstValue.populate(data, {path: 'classificationCode'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}
function fun5(data,callback){
            //callback(null,data);
  mstValue.populate(data, {path: 'address.addressType'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}

async.waterfall([fun1,fun2,fun3,fun4,fun5], function (err, result) {

    var fields = [
    {
      label: 'status.codeValue', 
      value: function(row, field, data) {
        return JSON.parse(JSON.stringify(row.status)).codeValue;
      },
      default: 'NULL',
      stringify: true 
    },'orgIdNumber','name',
    {
      label: 'classificationCode.codeValue', 
      value: function(row, field, data) {
        return JSON.parse(JSON.stringify(row.classificationCode)).codeValue;
      },
      default: 'NULL',
      stringify: true 
    },
    'address.sequenceNo',
    {
      label: 'address.addressType', 
      value: function(row, field, data) {
        return JSON.parse(JSON.stringify(row.address.addressType)).codeValue;
      },
      default: 'NULL',
      stringify: true 
    },
    'address.mailingIndex',
    'address.header',
    'address.organizationName',
    'address.street1',
    'address.street2',
    'address.city',
    'address.state',
    'address.zip',
    'address.country',
    'dioProvince',
    {
      label: 'parentId', 
      value: function(row, field, data) {
        return JSON.parse(JSON.stringify(row.parentId)).name;
      },
      default: 'NULL',
      stringify: true 
    }
    ];
    var csv = json2csv({ data: result, fields: fields }); 
 //     fs.writeFile('file2.csv', csv, function(err) {
  fs.appendFile('file2.csv', csv, function(err) {
  
        if (err) throw err;
        console.log('file saved');
      });
});



//"directoryId": new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3")
// org1.find({
//    "_id" : new mongoose.Types.ObjectId("578db77ec19cc73dbcbd1970"), 
//   "directoryId": new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3")
// }).select({"address":0,"ocdContact":0,"statistic":0})
// .populate('classificationCode')
// .populate('parentId')
// .exec(function(err,data){
// 	console.log(JSON.stringify(data,null,4));
//    // jsontoCsv(data);
// });


// async.waterfall([
//     function(callback) {
//       var qrDAta= org1.aggregate(
//           [
//             {
//               $match: {
//                "directoryId": new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3"),
//                  "status" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb")
//               }
//             },
//             {
//               $unwind: "$address"
//             },
//             {
//               $match: {
//               "address.deleted":{$in:[false,null]}
//               //"address.addressType":{$in:[null]}
//               }
//             }
//           ]);
// qrDAta.options = { allowDiskUse: true }; 
//       qrDAta.exec(
//           function(err,data){
//             console.log(err);
//             console.log(data);
//              //org1.populate(data, {path: 'parentId'}, function(err, populatedTransactions) {
//             // Your populated translactions are inside populatedTransactions
//         //    callback(null,data)
//         //});
            
//           });
          
        
//     },
//     function(fun1,callback) {
          
//           org1.populate(fun1, {path: 'status'}, function(err, populatedTransactions) {
//             // Your populated translactions are inside populatedTransactions
//             callback(null,populatedTransactions)
//         });
//      }
//      ,
//     function(fun1,callback) {
          
//           org1.populate(fun1, {path: 'address.addressType'}, function(err, populatedTransactions) {
//             // Your populated translactions are inside populatedTransactions
//             callback(null,populatedTransactions)
//         });
//     }
// ], function (err, result) {
//   console.log(JSON.stringify(result,null,4));
    
//     var fields = ['root','parentId.name','address.zip','address.addressType.codeValue'];
//     var csv = json2csv({ data: result, fields: fields });
 
//       fs.writeFile('file.csv', csv, function(err) {
//         if (err) throw err;
//         console.log('file saved');
//       });
// });



/*
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });

*/