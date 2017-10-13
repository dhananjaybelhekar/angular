var mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
const path = require('path')
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const app = express();
app.use(bodyParser.json())
app.get('/', function (req, res) { 
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.use('/api',function(req,res){
	if(req.method == 'GET')
	{
	require("./controller/"+req.path.split('/')[1]+".controller.js")['get'](req,res,req.path);
	}
	if(req.method == 'POST')
	{
	require("./controller/"+req.path.split('/')[1]+".controller.js")['post'](req,res,req.path);
	}
	if(req.method == 'PUT')
	{
	require("./controller/"+req.path.split('/')[1]+".controller.js")['put'](req,res,req.path);
	}
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


