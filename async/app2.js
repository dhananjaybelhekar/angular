

var mongoose = require("mongoose"),
Schema = mongoose.Schema;
//mongoose.connect("mongodb://192.168.10.178/OCD_XML", { useMongoClient: true });
mongoose.connect("mongodb://localhost/tw-UAT-20161212", { useMongoClient: true });
var fs = require('fs');
var orgScgema = new mongoose.Schema({
	tag:Schema.Types.String,
    children:[Schema.Types.Mixed],
});
var _DB={},
	_QR={qr:{"directoryId" : new mongoose.Types.ObjectId("57189b3e24d8bc65f4123bbf")},
		qr1:{"_id" :{$in:[
			new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c1"),
			// new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c7"),
			// new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c8")
			]} },
	qr2:{"_id" : new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c2")},
	qr3:{"_id" : new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c3")},
};

_DB.txn_organization = mongoose.model('TXN_Organization',orgScgema);

_DB.txn_personnel= mongoose.model('TXN_Personnel',{});

_DB.txn_temp= mongoose.model('TXN_Temp',new mongoose.Schema({

},{strict: false}));


function fun1(cb,d){
	_DB.txn_organization.find(_QR.qr1,{name:1}).exec(function(err,data){
		data.map((beach)=>{
			console.log(JSON.parse(JSON.stringify(beach)).name);
			d.push(
				{
					tag:"fun1",
					id:1,
					parent:0,
					printType:JSON.parse(JSON.stringify(beach)).name,
					children:[],
				});
			cb(d);
		});
	})
}
function fun2(cb,d){
	_DB.txn_organization.find(_QR.qr2,{name:1}).exec(function(err,data){
		d.push({
			tag:"fun2",
			printType:JSON.parse(JSON.stringify(data[0])).name,
			id:2,
			parent:1,
			children:[],
	});
		cb(d);
	})
}
function fun3(cb,d){
	_DB.txn_organization.find(_QR.qr3,{name:1}).exec(function(err,data){
		d.push({
			tag:"fun3",
			printType:JSON.parse(JSON.stringify(data[0])).name,
			id:3,
			parent:2,
			value:"sdf",
			children:[],
		});
		cb(d);
	})
}
function run(cb){
	fun1((data)=>{
		 fun2((data)=>{
		 	fun3(cb,data)
		 },data)
	},[])
}
function savefile(tag){
	return new Promise(function(resolve,reject){
		fs.appendFile('xml.txt',tag, function(err) {
        if (err) throw reject(err);
      });
		resolve(true)
	});
}
function bunflatten(nodes) {
    var map = {}, _NODE, roots = [];
    for (var i = 0; i < nodes.length; i += 1) {
        _NODE = nodes[i];
        _NODE.children = [];
        map[_NODE.id] = i;
        if (_NODE.parent !== 0) {
            _NODE.children = [];
            nodes[map[_NODE.parent]].children.push(_NODE);
        } else {
            roots.push(_NODE);
        }
    }
    return roots;
}
function cloneJSON(obj) {
    // basic type deep copy
    if (obj === null || obj === undefined || typeof obj !== 'object')  {
        return obj
    }
    // array deep copy
    if (obj instanceof Array) {
        var cloneA = [];
        for (var i = 0; i < obj.length; ++i) {
            cloneA[i] = cloneJSON(obj[i]);
        }              
        return cloneA;
    }                  
    // object deep copy
    var cloneO = {};   
    for (var i in obj) {
            if(i == 'children' && obj[i].length > 0 )
            cloneO[obj.tag]=cloneJSON(obj[i]);
          else
          cloneO[obj.tag]= obj.printType;
        
        //cloneO[i] = cloneJSON(obj[i]);
    }                  
    return cloneO;
}
run(function(data){
	//bunflatten(data)
	var temp = bunflatten(data);

	savefile(JSON.stringify(cloneJSON(temp),null,5)).then((res)=>{
		console.log("done FILE");
	})
})

