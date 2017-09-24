var express = require('express')
var path= require('path');
const app = express();
app.use('/', express.static(path.join(__dirname, '/js')));
app.use('/', express.static(path.join(__dirname, '/html')));
app.get('/*', function (req, res) {
    return res.sendFile(path.join(__dirname + '/index.html'));	
  })
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });