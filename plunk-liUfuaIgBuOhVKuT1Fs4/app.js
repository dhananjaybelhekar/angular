const express = require('express');
const fs= require('fs');
var bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json({ limit: '50mb' }));


app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/fileupload', function (req, res) {
var d=new Date().valueOf();
 var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
		
    
if("jpeg"==req.body.img.split(";")[0].split("/")[1])
{
var imageName = d + '.' + text + '.jpg';
}
if("gif"==req.body.img.split(";")[0].split("/")[1])
{
var imageName = d + '.' + text + '.gif';
}
if("x-icon"==req.body.img.split(";")[0].split("/")[1])
{
var imageName = d + '.' + text + '.ico';
}
if("png"==req.body.img.split(";")[0].split("/")[1])
{
var imageName = d + '.' + text + '.png';
}




var data = req.body.img.replace(/^data:image\/\w+;base64,/, "");

var buf = new Buffer(data, 'base64');
// fs.writeFile('../ss/'+imageName, buf);
// res.send(imageName);
fs.writeFile(imageName, buf, function (err) {
    if (err) 
        return res.send(err);
    res.send(imageName);
});

});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})