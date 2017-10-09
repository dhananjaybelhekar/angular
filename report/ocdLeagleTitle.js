var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsonexport = require('jsonexport');
var json2csv = require('json2csv');
var fs = require('fs');
var async = require('async');

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate-allowdiskuse');
 
var count=1;
mongoose.connect('mongodb://192.168.10.178/tw-prod-03-10-2017');

var mstValue = mongoose.model('MST_RefCodeValue',new mongoose.Schema({}));
var orgScgema = new mongoose.Schema({
  'parentId':{
        "type": Schema.Types.ObjectId,
        "ref": 'TXN_Organization'
    }

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
//new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3"),
function fun1(callback){
  console.log("func1");
 var aggregate=org1.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3"), 
          "status" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 2
    {
      $sort: { 
          "orgIdNumber" : 1
      }
    },

    // Stage 3
    {
      $unwind: "$legalTitles"
    },

    // Stage 4
    {
      $match: { 
          "legalTitles.deleted" : {
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
          "sequenceNo":1,
          "orgIdNumber" : 1, 
          "classificationCode" : 1, 
          "name" : 1, 
          "legalTitles" : 1, 
          "parentId" : 1
      }
    }
  ]

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
  callback(null, results,pageCount);
  }
}) 
}
 

function fun2(data,pageCount,callback){
  
  console.log("func2",pageCount);
            //callback(null,data);
  mstValue.populate(data, {path: 'classificationCode'}, function(err, populatedTransactions) {
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

function result(err, result) {
  console.log("result");
    var fields = [
    {
      label: 'status', 
      value: function(row, field, data) {
          var _data =JSON.parse(JSON.stringify(row));
          return ((_data.status) && (_data.status.codeValue)) ?(_data.status.codeValue):"";
        //return JSON.parse(JSON.stringify(row.status)).codeValue;
      },
      default: 'NULL',
      stringify: true 
    },
  {
      label: 'classificationCode', 
      value: function(row, field, data) {
          var _data =JSON.parse(JSON.stringify(row));
          return ((_data.classificationCode) && (_data.classificationCode.codeValue)) ?(_data.classificationCode.codeValue):"";
        //return JSON.parse(JSON.stringify(row.status)).codeValue;
      },
      default: 'NULL',
      stringify: true 
    },  "orgIdNumber","name",
    {
      label: 'sequanceNo', 
      value: function(row, field, data) {
          var _data =JSON.parse(JSON.stringify(row));
          return ((_data.legalTitles) && (_data.legalTitles.sequenceNo)) ?(_data.legalTitles.sequenceNo):"";
        //return JSON.parse(JSON.stringify(row.status)).codeValue;
      },
      default: 'NULL',
      stringify: true 
    },
    {
      label: 'legalTitles', 
      value: function(row, field, data) {
          var _data =JSON.parse(JSON.stringify(row));
          return ((_data.legalTitles) && (_data.legalTitles.legalTitle)) ?(_data.legalTitles.legalTitle):"";
        //return JSON.parse(JSON.stringify(row.status)).codeValue;
      },
      default: 'NULL',
      stringify: true 
    }


    ];
    var csv = json2csv({ data: result, fields: fields }); 
 //     fs.writeFile('file2.csv', csv, function(err) {
//  fs.appendFile('file3.csv', csv, function(err) {
     fs.writeFile('ocdLegalTitle.csv', csv, function(err) {
        if (err) throw err;
         console.log("done");
      });
}


var show = function(){
  async.waterfall([fun1,fun2,fun3],result );          
}
    show();
  

    