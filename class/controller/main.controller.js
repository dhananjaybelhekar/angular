var express = require('express');
var obj = require("../model/main.js"); //all db 
class MainController 
{
	cat(req, res)
	{
    	  var str = new Date().toString(); 
          obj.catSchema().create({ name: str }, function (err, small) {
            if (err) return res.status(404).end();//res.send(err)
                res.send(small);
          })
	}
}
module.exports = new MainController();