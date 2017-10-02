var express = require('express');
var obj = require("../model/main.js"); //all db 
class MainController 
{
	cat(req, res ,path)
	{
		console.log(req.query);
		console.log(req.body);
		console.log(req.params);	console.log(path);
		
    	  var str = new Date().toString(); 
          obj.catSchema()[path.split('/')[3]]({ name: str }, function (err, small) {
            if (err) return res.status(404).end();//res.send(err)
                res.send(small);
          })
	}
	getcat(req, res)
	{
    	  var str = new Date().toString(); 
          obj.catSchema().find({}, function (err, small) {
            if (err) return res.status(404).end();//res.send(err)
                res.send(small);
          })
	}
}
module.exports = new MainController();