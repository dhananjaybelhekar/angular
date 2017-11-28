var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fun = require("./fun1.js");

mongoose.connect('mongodb://192.168.10.178/tw-prod-06-11-2017', { useMongoClient: true });
mongoose.Promise = global.Promise;
// mongoose.connection.db.dropCollection('TXN_Temp', function(err, result) {

//     console.log("DONE DROP");
// });
fun.getAll();