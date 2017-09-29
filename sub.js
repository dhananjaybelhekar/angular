let blockchanin = require('./blockchanin.js');


// blockchanin.createNew(new block(1,"dhananjay"));
// blockchanin.createNew(new block(3,"anjali"));
// blockchanin.createNew(new block(4,"dhananjali"));
for(let i=0;i<10;i++)
		blockchanin.createNew(new block(i,i.toString()));
//console.log(JSON.stringify(blockchanin,null,4));
console.log(blockchanin.isValidBlock());
blockchanin.chain[2].data = "454545";
console.log(blockchanin.isValidBlock());