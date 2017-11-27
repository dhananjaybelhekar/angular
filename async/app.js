var async = require("async");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fun = require("./fun1.js");
var res = require("./result.js");
mongoose.connect('mongodb://192.168.10.178/tw-prod-06-11-2017', { useMongoClient: true });
mongoose.Promise = global.Promise;
async.waterfall(fun, res);