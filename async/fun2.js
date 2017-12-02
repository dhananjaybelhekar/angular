var mongoose = require('mongoose');
var json2csv = require('json2csv');
var _ = require('lodash');
var async = require("async");
var fs = require('fs');
var Schema = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate-allowdiskuse');

var orgScgema = new mongoose.Schema({
  'parentId':{
        "type": Schema.Types.ObjectId,
        "ref": 'TXN_Organization'
    }
});
var _DB={},
	_QR={},
	_NODE={},
	_COUNT = 1,
	_OPTION = { page : _COUNT, limit : 5000, allowDiskUse: true };

orgScgema.plugin(mongooseAggregatePaginate);

_DB.txn_organization = mongoose.model('TXN_Organization',orgScgema);

_DB.txn_personnels = mongoose.model('TXN_Personnels',{});

_DB.txn_temp= mongoose.model('TXN_Temp',new mongoose.Schema({

},{strict: false}));


_DB.txn_chapterspecifications = mongoose.model('TXN_Chapterspecifications',{});

module.exports  = {
	exec:function(data){
		show(addChildren(data));
	}
}
var d={
	fun1:function(callback){
		 var aggregate=_DB[_NODE.collection].aggregate(evaluate(_NODE.query));
		_DB.txn_organization.aggregatePaginate(aggregate, _OPTION, function(err, results, pageCount, count) {
		console.log("Processing ",_COUNT," to ",pageCount,"of" , count ,"entries");
		  if(err) 
		  {
		    console.log(err)
		  }
		  else
		  { 
		  callback(null, results,pageCount, count);
		  }
		})
	},
	result:function(err,results,pageCount, count){
	//	console.log("results",results);
		results.map(function(data){
			savefile("-Org")
			savefile("--name"," "+data.name)	
			savefile("--OrgId"," "+data.name)
		})
		
		console.log("pageCount",pageCount);
		console.log("pageCount",count);
	}
}
function show(data){
	for(var i=0;i<data.length;i++)
		{
		    if(data[i].qr == undefined)
		    	savefile(data[i].tag)
		    if(data[i].query)
		    {
				queryExec(data[i]);
		    }
		    if(data[i].children.length > 0)
		    	show(data[i].children);
		}
}
function savefile(tag,value=""){
	 fs.appendFile('xml.txt',tag+value+'\n', function(err) {
        if (err) throw err;
      });
}
function bunflatten(nodes) {
    var map = {}, _NODE, roots = [];
    for (var i = 0; i < nodes.length; i += 1) {
        _NODE = nodes[i];
        _NODE.children = [];
        map[_NODE.id] = i;
        if (_NODE.parent !== 1) {
            _NODE.children = [];
            nodes[map[_NODE.parent]].children.push(_NODE);
        } else {
            roots.push(_NODE);
        }
    }
    return roots;
}
function addChildren(arr){
		return arr.map(function(data) {
		    data.children = [];
		    return data;
		})
		bunflatten(arr);
}
function queryExec(data)
{
		_NODE=data;
		//console.log(JSON.stringify(evaluate(_NODE.query)));
		async.waterfall([d.fun1], d.result);
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