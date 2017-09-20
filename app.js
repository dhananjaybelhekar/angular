var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsonexport = require('jsonexport');
var fs = require('fs');
//mongoose.connect('mongodb://192.168.10.178/OCD_XML');
mongoose.connect('mongodb://192.168.10.178/twoCollection');


//var temp = mongoose.model('temps',new mongoose.Schema({}, {strict: false}));
//var temp = mongoose.model('report1',new mongoose.Schema({});
// var org = mongoose.model('TXN_Organization',new mongoose.Schema({
//   "parentId": {
//         "type": Schema.Types.ObjectId,
//         "ref": 'TXN_Organization'
//     }
// }));
var org1 = mongoose.model('pers',new mongoose.Schema({}));
//Schema.Types.ObjectId()

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

org1.find({}).sort({"orgId.org_id":1})
.exec(function(err,data){
    //console.log(data);

    jsontoCsv(data);

});