var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fun = require("./fun1.js");

mongoose.connect('mongodb://localhost/tw-UAT-20161212', { useMongoClient: true });
mongoose.Promise = global.Promise;
// mongoose.connection.db.dropCollection('TXN_Temp', function(err, result) {

//     console.log("DONE DROP");
// });
fun.getAll();
