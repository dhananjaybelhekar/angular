var mongoose = require('mongoose');
var obj = require("./main.js");
const express = require('express')


mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const app = express()
app.get('/', function (req, res) { 
    var str = new Date().toString(); 
            var temp = obj.catSchema();
            temp.create({ name: str }, function (err, small) {
            if (err) return res.send(err)
                res.send(small)
          })
})
app.get('/cat', function (req, res) { 
    var str = new Date().toString(); 
            var temp = obj.catSchema();
            temp.create({ name: str }, function (err, small) {
            if (err) return res.send(err)
                res.send(small)
          })
})
app.get('/bat', function (req, res) { 
    var str = new Date().toString(); 
            var temp = obj.batSchema();
            temp.create({ last: str }, function (err, small) {
            if (err) return res.send(err)
                res.send(small)
          })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
