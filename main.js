var SHA256 = require("crypto-js/sha256");
class main
{
	show(){
		console.log("call show");
		console.log(SHA256("Message").toString());
	}
}
let a= new main();
a.show();
