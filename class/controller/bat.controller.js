var express = require('express');
var obj = require("../model/main.js"); //all db 
class BatController 
{

	get(req, res ,path)
	{
    	  var str = new Date().toString(); 
          obj.batSchema()[path.split('/')[3]](req.query, function (err, small) {
            if (err) return res.status(404).end();//res.send(err)
                res.send(small);
          })
	}
	post(req, res,path)
	{ 
    	  var str = new Date().toString(); 
         obj.batSchema()[path.split('/')[3]](req.body, function (err, small) {
            if (err) return res.status(404).end();//res.send(err)
                res.send(small);
          })
	}
}
module.exports = new BatController();

    //console.log("req.query",req.query);
    // console.log("req.body",req.body);
    // console.log("req.params",req.params);  
    // console.log("path",path);