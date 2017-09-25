var SHA256 = require("crypto-js/sha256");
class block
{
	constructor(index,data,phash = "")
	{
		this.index = index;
		this.data = data;
		this.phash = phash;
		this.hash=this.show();


	}
	show(){
		return SHA256(this.index+this.data).toString();

	}
}
class Blockchanin
{
	constructor()
	{
		this.chain = [new block(0,"hi")];
	}
	createNew(data)
	{
		data.phash = this.getLetest().hash;
		data.hash = data.show();
		this.chain.push(data);
	}
	getLetest()
	{
		return this.chain[ this.chain.length - 1 ];
	}
}

//let b= a.show({phash:null,msg:"hii"});
//console.log(a);
var blockchanin = new Blockchanin();
//blockchanin.createNew(new );
//blockchanin.createNew();
blockchanin.createNew(new block(1,"dhananjay"));
blockchanin.createNew(new block(3,"anjali"));
console.log(blockchanin);
