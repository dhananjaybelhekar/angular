var mongoose = require('mongoose');
//var obj = require("./model/main.js");
//  var mainCtrl = require("./controller/main.controller.js");
// var batCtrl = require("./controller/bat.controller.js");
const express = require('express')
const path = require('path')

var arr=['./controller/main.controller.js','./controller/bat.controller.js'];
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const app = express()
app.get('/', function (req, res) { 
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/cat',require("./controller/main.controller.js")['cat']);

app.get('/bat',require("./controller/bat.controller.js")['bat']);

app.use('/api',function(req,res){
	if(req.method == 'GET')
	{
	require("./controller/"+req.path.split('/')[1]+".js")[req.path.split('/')[2]](req,res);
	}
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


