var mongoose = require("mongoose"),
Schema = mongoose.Schema;
//mongoose.connect("mongodb://192.168.10.178/OCD_XML", { useMongoClient: true });
mongoose.connect("mongodb://localhost/tw-UAT-20161212", { useMongoClient: true });
var fs = require('fs');
var orgScgema = new mongoose.Schema({
	personnel:Schema.Types.Mixed,
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
	qr2:[{$match: { "_id": {"_eval":"Id","value":"577e6a1fc19c234cf6e387d5" }} }, {$unwind: "$personnel"}, {$lookup: {"from" : "txn_personnels", "localField" : "personnel", "foreignField" : "_id", "as" : "personnel"} }, {$unwind: "$personnel"}, {$match: {"personnel.deleted":false } }, {$group: {_id:"_id", Per:{$addToSet:"$personnel"} } } ],
	qr3:{"_id" : new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c3")},
};

_DB.txn_organization = mongoose.model('TXN_Organization',orgScgema);

_DB.txn_personnel= mongoose.model('TXN_Personnel',{});

_DB.txn_temp= mongoose.model('TXN_Temp',new mongoose.Schema({

},{strict: false}));

function fun1(cb,d){
	_DB.txn_organization.find(_QR.qr).exec(function(err,data){
		var xxx="";
	xxx+="Sec\n";
			
		data.map((zzz)=>{
			zzz = JSON.parse(JSON.stringify(zzz));
		
		xxx+=" Org\n";
		xxx+="  OrgName\n";
	
		//console.log(zzz.features);
		// for(var dd in zzz.features)
		// {
		// xxx.push({
		// 	tag:"featuresInfo",
		// 	parent:2,
		// 	id:4,
		// });

		// 	xxx.push({
		// 		tag:"featuresName",
		// 		parent:4,
		// 		id:5,
		// 		printType:zzz.features[dd].codeName
		// 	});
		// 	xxx.push({
		// 		tag:"featureType",
		// 		parent:4,
		// 		id:6,
		// 		printType:zzz.features[dd].featureType
		// 	});
		// 		xxx.push({
		// 		tag:"featureType",
		// 		parent:4,
		// 		id:7,
		// 		printType:zzz.features[dd].code
		// 	});
		// }


		});
	//	var zzz =JSON.parse(JSON.stringify(data))[0];
		


			cb(xxx);
	});
}
function run(cb){
	fun1((data)=>{
		cb(data);
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
	// var temp = bunflatten(data);
	// savefile(JSON.stringify(cloneJSON(temp),null,5)).then((res)=>{
	// 	console.log("done FILE");
	// })
//	var temp = bunflatten(data);
	savefile(JSON.stringify(data,null,5)).then((res)=>{
		console.log("done FILE");
	})
})
function evaluate(object) {
    if (object && object.constructor === Array) {
        for (var i = 0; i < object.length; i++) {
            object[i] = evaluate(object[i]);
        }
    } else if (object && typeof object == 'object' && Object.keys(object).length > 0) {
        if (Object.keys(object).indexOf('_eval') < 0) {
            for (var key in object) {
                object[key] = evaluate(object[key]);
            }
        } else switch (object['_eval']) {
            case 'Id':
                {
                    object =new mongoose.Types.ObjectId(object['value']);
                    break;
                }
            case 'regex':
                {
                    object = new RegExp(object['value'], 'i');
                    break;
                }
            case 'Date':
                {
                    var d = new Date(object['value']);
                    object = d.toISOString();
                    break;
                }

        }
    }
    return object;
}
