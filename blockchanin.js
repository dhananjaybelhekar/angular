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
		//return SHA256(JSON.stringify(this)).toString();
		return SHA256(this.index+this.data+this.phash).toString();

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
	isValidBlock(){
		for(let i=1;i<this.chain.length;i++ ){
			let current = this.chain[i] ;
			let pBlock = this.chain[i-1];
			if(current.show() !== current.hash)
			return false;
			if(current.phash !== pBlock.hash)
			return false;
		}
		return true;
		
	}
}

let blockchanin = new Blockchanin();


blockchanin.createNew(new block(1,"dhananjay"));
blockchanin.createNew(new block(3,"anjali"));
blockchanin.createNew(new block(4,"dhananjali"));
//for(let i=0;i<10;i++)
//		blockchanin.createNew(new block(i,i.toString()));
//console.log(JSON.stringify(blockchanin,null,4));
console.log(blockchanin);
console.log(blockchanin.isValidBlock());
blockchanin.chain[2].data = "anjali";
console.log(blockchanin.isValidBlock());