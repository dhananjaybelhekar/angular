

var mongoose = require("mongoose"),
Schema = mongoose.Schema;
mongoose.connect("mongodb://192.168.10.178/OCD_XML", { useMongoClient: true });

var orgScgema = new mongoose.Schema({
	tag:Schema.Types.String,
    children:[Schema.Types.Mixed],
});

var _DB={},
	_QR={qr1:{"_id" : new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c1")},
	qr2:{"_id" : new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c2")},
	qr3:{"_id" : new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c3")},
};

_DB.txn_organization = mongoose.model('TXN_Organization',orgScgema);

_DB.txn_personnel= mongoose.model('TXN_Personnel',{});

_DB.txn_temp= mongoose.model('TXN_Temp',new mongoose.Schema({

},{strict: false}));


function fun1(cb,d){
	_DB.txn_organization.find(_QR.qr1,{name:1}).exec(function(err,data){
		console.log("fun1");
		// d.tag="sec";
		// d.children=[];
		d={tag:"fun1","children":data};
		cb(d);
	})
}
function fun2(cb,d){
	_DB.txn_organization.find(_QR.qr2,{name:1}).exec(function(err,data){
		
		d.children[0].children={tag:"fun2","children":data};
		//d.children.children[1]={tag:"fun2","children":data};
		cb(d);
	})
}
function fun3(cb,d){
	_DB.txn_organization.find(_QR.qr3,{name:1}).exec(function(err,data){
		d.children[0].children[0].children={tag:"fun3","children":data};
		cb(d);
	})
}

function run(cb){
	fun1((data)=>{
		cb(data);
		 fun2((data)=>{
		//	cb(data);
		 	fun3(cb,data)
		 },data)
	},{})
}
run(function(data){
	console.log("END ALL",JSON.stringify(data,null,5));
})

