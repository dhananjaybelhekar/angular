var mongoose = require("mongoose"),
jsonxml = require('jsontoxml'),
format = require('xml-formatter'),
_ = require('lodash'),
ProgressBar = require('progress'),
jsonata = require("jsonata"),
cleanDeep = require('clean-deep'),
Schema = mongoose.Schema;
//mongoose.connect("mongodb://192.168.10.178/OCD_XML", { useMongoClient: true });
mongoose.connect("mongodb://192.168.10.82/tw-prod-20171216", { useMongoClient: true });
var fs = require('fs');
var orgScgema = new mongoose.Schema({
	// personnel:Schema.Types.Mixed,
	// name:Schema.Types.String,
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
		// Snamee 1
		{
			$match: {
			    "directoryId": {"_eval":"Id","value":"57189cc224d8bc65f4123bc1"}, 
			    "status": {"_eval":"Id","value":"57283b4214dde6a43b46a7bb"}, 
			
			}
		},
	],
	CFSINDEX:    [
    // Stage 1
    {
      $match: {
      "listingName":{$ne:null}
      }
    },

    // Stage 2
    {
      $group: { 
          "_id" : {
              "listingName" : "$listingName", 
              "specificationType" : "$specificationType"
          }, 
          "Org" : {
              "$addToSet" : "$organizationId"
          }
      }
    },

    // Stage 3
    {
      $group: {
      _id:"$_id.listingName",
      data:{$push:{specificationType:"$_id.specificationType","Org":"$Org"}}
      }
    },

    // Stage 4
    {
      $sort: {
      "_id":1
      }
    }
  ]
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

_DB.txn_chapterspecifications= mongoose.model('txn_chapterspecification',new mongoose.Schema({

}));


_DB.txn_organization = mongoose.model('TXN_Organization',orgScgema);

_DB.txn_temp= mongoose.model('TXN_Temp',new mongoose.Schema({

},{strict: false}));

function fun1(cb,d){
    
	_DB.txn_chapterspecifications.aggregate(evaluate(_QR.CFSINDEX)).exec(function(err,data){
		 _DB.txn_organization.populate(data,
		 	{
		 		path: 'data.Org', 
		 		//sort:{"name.first": 1},
		 		select:{name:1,org_id:1},
		 		match: { deleted:false }
		 	},(err1,data2)=>{
				var xxx=[];	
				xxx.push({name:"component",attrs:{type:'CFS-Regular'},id:1,parent:0 }); 
				xxx.push({name:"Sec",id:2,parent:1 }); 
				data2.map((zzz)=>{
					xxx.push({name:"Chapter",id:3,parent:2}); 	
					xxx.push({name:"ChapterName",id:4,parent:3,text:zzz._id }); 	
					for(var org in zzz.data)
					{
						var temp = JSON.parse(JSON.stringify(zzz.data[org]));
						xxx.push({name:"SpecificationType",id:5,parent:3}); 	
						xxx.push({name:"SpecificationTypeName",id:6,parent:5,text:temp.specificationType }); 	
						xxx.push({name:"OrgInfo",id:7,parent:3}); 		
						for(var orgOfOrg in temp.Org)
							{
							xxx.push({name:"Org",id:8,parent:7}); 	
							xxx.push({name:"OrganizationID",id:9,parent:8,text:temp.Org[orgOfOrg].org_id }); 	
							xxx.push({name:"OrganizationName",id:10,parent:8,text:temp.Org[orgOfOrg].name}); 	
							}
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
function savefile(name){
	return new Promise(function(resolve,reject){
		fs.appendFile( new Date().getTime()+'.xml',format(jsonxml(cleanDeep(bunflatten(name)))), function(err) {
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
run(function(data){
    savefile(data).then((res)=>{
        console.log("done FILE");
    })
})