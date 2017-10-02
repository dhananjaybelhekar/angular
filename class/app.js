var mongoose = require('mongoose');
var obj = require("./model/main.js");
var mainCtrl = require("./controller/main.controller.js");
var batCtrl = require("./controller/bat.controller.js");
const express = require('express')
const path = require('path')

mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const app = express()
app.get('/', function (req, res) { 
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/cat',mainCtrl.cat);

app.get('/bat',batCtrl.bat);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


