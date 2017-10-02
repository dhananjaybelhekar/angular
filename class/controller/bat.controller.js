var express = require('express');
var obj = require("../model/main.js"); //all db 
class BatController 
{
	bat(req, res){
    var str = new Date().toString(); 
            obj.batSchema().create({ last: str }, function (err, small) {
            if (err) return res.send(err)
                res.send(small)
        });
	}
}
module.exports = new BatController();