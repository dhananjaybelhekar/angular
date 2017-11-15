var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsonexport = require('jsonexport');
var json2csv = require('json2csv');
var fs = require('fs');
var async = require('async');

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate-allowdiskuse');
 
var count=1;
mongoose.connect('mongodb://192.168.10.178/tw-prod-30-10-2017');

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
       "directoryId": new mongoose.Types.ObjectId("57189b3e24d8bc65f4123bbf") ,
       "status": { $ne: new mongoose.Types.ObjectId("5763dc21c19ce14186492e46")}
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
      "address.addressType" : new mongoose.Types.ObjectId("576286d0c19cef300bc720e6")
      }
    },    {
      $project: {
      "orgIdNumber":1,
      "name":1,
      "address.street1" :1,
      "address.street2":1,
      "address.cityName":1,
      "address.stateName":1,
      "address.zip":1,
      "contact.phoneNumbers":1,
      "contact.faxNumbers":1,
      "contact.emails.primary":1,
      "contact.websites":1,
      "contact.social":1,
      "governing":1,
      "activities.freeText":1,
      "attendance.countNumber":1,
      "membership":1,
      "timing":1,
      "entityType":1
      }
    }
  ]

);
var options = { page : count, limit : 5000, allowDiskUse: true }
console.log("PAGE_CURRENT_COUNT",count);
org1.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
  if(err) 
  {
    console.log(err)
  }
  else
  { 
    console.log("pageCount_",pageCount);
    
  callback(null, results);
  }
}) 
}
 

function fun2(data,callback){
  console.log("func2");
            //callback(null,data);
  mstValue.populate(data, {path: 'status'}, function(err, populatedTransactions) {
            // Your populated translactions are inside populatedTransactions
            callback(null,populatedTransactions);
  });
}



function result(err, result) {
  console.log("result");
    var fields = [
     "orgIdNumber",
     "name",
     "address.street1" ,
     "address.street2",
     "address.cityName",
     "address.stateName",
     "address.zip",
     "contact.phoneNumbers",
     "contact.faxNumbers",
     "contact.emails.primary",
     "contact.websites",
     "contact.social",
     "governing",
     "activities.freeText",
     "attendance.countNumber",
     "membership",
     "timing",
     "entityType"
    ];
  var csv = json2csv({ data: result, fields: fields }); 
 //     fs.writeFile('file2.csv', csv, function(err) {
//  fs.appendFile('file3.csv', csv, function(err) {
     fs.appendFile('OMDD.csv', csv, function(err) {
        if (err) throw err;
         
        else
        {
          count = count + 1;
          if(count < 5)
          show();          
        else 
        {
          console.log("done");
        }
        }
      });
}


var show = function(){
  async.waterfall([fun1],result );          
}
    show();
  

    
    