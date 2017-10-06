var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsonexport = require('jsonexport');
var json2csv = require('json2csv');
var fs = require('fs');
var async = require('async');

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

var orgScgema = new mongoose.Schema({});

var org1 = mongoose.model('statdbd',orgScgema);
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
org1.find({ "statistic.value": { $nin: [null,""] } }).sort('orgIdNumber').exec(function(err,data){
   callback(null, data);
})
}

async.waterfall([fun1], function (err, result) {

    var fields = [
    {
      label: 'orgIdNumber', 
      value: function(row, field, data) {
        return JSON.parse(JSON.stringify(row)).orgIdNumber;
      },
      default: 'NULL',
      stringify: true 
    },{
      label: 'classificationCode', 
      value: function(row, field, data) {
        return JSON.parse(JSON.stringify(row))['classificationCode.codeValue'];
      },
      default: 'NULL',
      stringify: true 
    },
    {
      label: 'name', 
      value: function(row, field, data) {
        return JSON.parse(JSON.stringify(row)).name;
      },
      default: 'NULL',
      stringify: true 
    }

    // 'classificationCode.description',
    // 'name',
    // 'abbrevationName',
    // 'statistic.statisticType.level',
    // 'statistic.sequenceNo',
    // 'statistic.statisticType.sequenceNo',
    // 'statistic.statisticType.description',
    // 'statistic.statisticTypeName',
    // 'statistic.text',
    // 'statistic.value',
    // 'parentId.orgIdNumber',
    // 'parentId.name',
    // 'parentId.classificationCode.codeValue'
    ];
    var csv = json2csv({ data: result, fields: fields }); 
 //     fs.writeFile('file2.csv', csv, function(err) {
  fs.writeFile('statdio.csv', csv, function(err) {
  
        if (err) throw err;
        console.log('file saved');
      });
});