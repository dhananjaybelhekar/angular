const pug = require('pug');
var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;

var op ={
    "indent_size": 4,
    "html": {
        "end_with_newline": true,
        "js": {
            "indent_size": 2
        },
        "css": {
            "indent_size": 2
        }
    },
    "css": {
        "indent_size": 1
    },
    "js": {
       "preserve-newlines": true
    }
};

fs.writeFile('index.html',beautify_html(pug.compileFile('index.pug')(), op), function(err) {
        if (err) throw err;
        	console.log("done");
      });

