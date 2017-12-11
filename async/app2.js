



var mongoose = require("mongoose"),
jsonxml = require('jsontoxml'),
format = require('xml-formatter'),
_ = require('lodash'),
ProgressBar = require('progress'),
jsonata = require("jsonata"),
Schema = mongoose.Schema;
mongoose.connect("mongodb://192.168.10.178/OCD_XML", { useMongoClient: true });
//mongoose.connect("mongodb://localhost/tw-UAT-20161212", { useMongoClient: true });
var fs = require('fs');
var orgScgema = new mongoose.Schema({
	// personnel:Schema.Types.Mixed,
	// tag:Schema.Types.String,
 //    children:[Schema.Types.Mixed],
 		"personnel": [{
        "type": Schema.Types.ObjectId,
        "ref": 'TXN_Personnel',
    }],
});


var _DB={},
	_QR={qr:{"directoryId" : {"_eval":"Id","value":"57189b3e24d8bc65f4123bbf"}},
		qr1:{"_id" :{$in:[
			new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c1"),
			// new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c7"),
			// new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c8")
			]} },
	qr2:[{$match: { "_id": {"_eval":"Id","value":"577e6a1fc19c234cf6e387d5" }} }, {$unwind: "$personnel"}, {$lookup: {"from" : "txn_personnels", "localField" : "personnel", "foreignField" : "_id", "as" : "personnel"} }, {$unwind: "$personnel"}, {$match: {"personnel.deleted":false } }, {$group: {_id:"_id", Per:{$addToSet:"$personnel"} } } ],
	qr3:{"_id" : new mongoose.Types.ObjectId("57640ac1c19caec92e9c30c3")},
	cfs:[
		// Stage 1
		{
			$match: {
			    "directoryId": {"_eval":"Id","value":"57189cc224d8bc65f4123bc1"}, 
			    "status": {"_eval":"Id","value":"57283b4214dde6a43b46a7bb"}, 
			
			}
		},
	],
};



_DB.txn_personnel= mongoose.model('TXN_Personnel',new mongoose.Schema({
	    "name": {
        "prefix": String,
        "first": String,
        "middle": String,
        "last": String,
        "suffix": String
    }

}));
_DB.txn_organization = mongoose.model('TXN_Organization',orgScgema);

_DB.txn_temp= mongoose.model('TXN_Temp',new mongoose.Schema({

},{strict: false}));

function fun1(cb,d){
	_DB.txn_organization.aggregate(evaluate(_QR.cfs)).exec(function(err,data){
		 _DB.txn_organization.populate(data,
		 	{
		 		path: 'personnel', 
		 		//sort:{"name.first": 1},
		 		match: { deleted:false }
		 	},(err1,data2)=>{
		 	// console.log(data2[2]);
				var xxx=[];
				xxx.push({tag:"Sec",id:1,parent:0 }); 
				data2.map((zzz)=>{
				zzz = JSON.parse(JSON.stringify(zzz));
				xxx.push({tag:"Org",id:2,parent:1 });
				xxx.push({tag:"OrgInfo",id:7,parent:2});
				xxx.push({tag:"ID",printType:zzz._id,id:13,parent:7});
				xxx.push({tag:"OrgName",printType:zzz.name,id:3,parent:7});
				xxx.push({tag:"OrgId", printType:zzz.org_id,id:9,parent:7});
				xxx.push({tag:"listingTypeInfo",id:4,parent:2});
				// var res = jsonata("listingType[listingName='Foreign Banks']").evaluate(zzz); 
				// console.log(res)
				for(var dd in zzz.listingType)
				{
					xxx.push({tag:"listingType", parent:4, id:5, }); 
					xxx.push({tag:"featuresName", parent:5, id:6, printType:zzz.listingType[dd].listingName }); 
				}
				xxx.push({tag:"keyPersonnelInfo",id:7,parent:2});
				//console.log(jsonata("name").evaluate(_.cloneDeep(zzz.personnel))); 
				//console.log(_.cloneDeep(zzz.personnel)); 				
				for(var dd in zzz.personnel)
				{
				// console.log(zzz.personnel[dd]);
					xxx.push({tag:"PersonnelInfo",  id:8, parent:7,}); 
					xxx.push({tag:"employee_id",  id:12, parent:8, printType:zzz.personnel[dd].employee_id}); 
					xxx.push({tag:"PersonneltitleMasterName",  id:11, parent:8, printType:zzz.personnel[dd].titleMasterName}); 
					xxx.push({tag:"PersonnelFirstName",  id:9, parent:8, printType:zzz.personnel[dd].name.first }); 
					xxx.push({tag:"PersonnelLastName",  id:10, parent:8, printType:zzz.personnel[dd].name.last }); 
				}

				});
				cb(xxx); 	
		 });
		
	})
}
function run(cb){
	fun1((data)=>{
		cb(data);
	},[])
}
function savefile(tag){
	return new Promise(function(resolve,reject){
		fs.appendFile('xml.xml',format(jsonxml(cloneJSON(bunflatten(tag)))), function(err) {
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
	savefile(data).then((res)=>{
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