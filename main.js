var SHA256 = require("crypto-js/sha256");
class main
{
	show(data){
		return SHA256(JSON.stringify(data)).toString();

	}
}
let a= new main();
let b= a.show({phash:null,msg:"hii"});
console.log(b);

