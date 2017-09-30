//var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var x=JSON.stringify({foo:123,bar:456,data:{foo:123}});
console.log(SHA256(x).toString());