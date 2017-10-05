var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsonexport = require('jsonexport');
var fs = require('fs');
//mongoose.connect('mongodb://192.168.10.178/OCD_XML');
mongoose.connect('mongodb://192.168.10.178/tw-prod-03-10-2017');


//var temp = mongoose.model('temps',new mongoose.Schema({}, {strict: false}));
//var temp = mongoose.model('report1',new mongoose.Schema({});
// var org = mongoose.model('TXN_Organization',new mongoose.Schema({
//   "parentId": {
//         "type": Schema.Types.ObjectId,
//         "ref": 'TXN_Organization'
//     }
// }));

var mstValue = mongoose.model('MST_RefCodeValue',new mongoose.Schema({}));
var org1 = mongoose.model('TXN_Organization',new mongoose.Schema({
        "classificationCode": {
        "type": Schema.Types.ObjectId,
        "ref": 'MST_RefCodeValue'
    },
}));
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
//"directoryId": new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3")
org1.find({
   "_id" : new mongoose.Types.ObjectId("578db77ec19cc73dbcbd1970"), 
  "directoryId": new mongoose.Types.ObjectId("57189cd924d8bc65f4123bc3")
}).select({"address":0,"ocdContact":0,"statistic":0})
.populate('classificationCode')
.populate('parentId')
.exec(function(err,data){
	console.log(JSON.stringify(data,null,4));
   // jsontoCsv(data);
});



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