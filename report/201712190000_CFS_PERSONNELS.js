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
          "directoryId" : new mongoose.Types.ObjectId("57189cc224d8bc65f4123bc1"), 
          "status" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb"), 
          "active" : true, 
          "deleted" : false
      }
    },

    // Stage 2
    {
      $unwind: "$personnel"
    },

    // Stage 3
    {
      $lookup: { 
          "from" : "txn_personnels", 
          "localField" : "personnel", 
          "foreignField" : "_id", 
          "as" : "personnel"
      }
    },

    // Stage 4
    {
      $unwind: "$personnel"
    },

    // Stage 5
    {
      $match: { 
          "personnel.name.last" : {
              "$nin" : [
                  null, 
                  ""
              ]
          }, 
          "personnel.deletedFlag" : true
      }
    },

    // Stage 6
    {
      $sort: { 
          "personnel.name.last" : 1
      }
    },

    // Stage 7
    {
      $project: { 
          "personnel.name" : 1
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
        
            "personnel.name.prefix",
            "personnel.name.first",
            "personnel.name.middle",
            "personnel.name.last",
            "personnel.name.suffix"
    ];
    var csv = json2csv({ data: result, fields: fields }); 
 //     fs.writeFile('file2.csv', csv, function(err) {
//  fs.appendFile('file3.csv', csv, function(err) {
     fs.appendFile('20171215.csv', csv, function(err) {
        if (err) throw err;
        else
        {
          count = count + 1;
          if(count <= 2)
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


