var express = require('express');
var obj = require("../model/main.js"); //all db 
class MainController 
{
	get(req, res ,path)
	{
    	  var str = new Date().toString(); 
          obj['catSchema']()[path.split('/')[2]](obj.qr(req.query), function (err, small) {
            if (err) return res.status(404).end();//res.send(err)
                res.send(small);
          })
	}
	post(req, res,path)
	{
    	  var str = new Date().toString(); 
         obj.catSchema()[path.split('/')[2]]( obj.qr(req.body), function (err, small) {
            if (err) return res.status(404).end();//res.send(err)
                res.send(small);
          })
	}
  put(req, res,path){   
    var conditions = obj.qr(req.query), update = obj.qr(req.body), options = { multi: true };
    obj.catSchema()[path.split('/')[2]](conditions, update, options, function (err, small) {
            if (err) return res.status(404).end();//res.send(err)
                res.send(small);
          })
  }
}
module.exports = new MainController();

  // console.log(req.query);
    // console.log(req.body);
    // console.log(req.params); 
  //   console.log(path);