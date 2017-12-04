


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

_DB.txn_personnel= mongoose.model('TXN_Personnel',{});

_DB.txn_temp= mongoose.model('TXN_Temp',new mongoose.Schema({

},{strict: false}));


_DB.txn_chapterspecifications = mongoose.model('TXN_Chapterspecifications',{});

module.exports  = {
	exec:function(data){

//console.log(JSON.stringify(bunflatten(addChildren(data)),null,5));
		show(bunflatten(addChildren(data)));
	}
}

    


var d={
	fun1:function(callback){

		 _DB[_NODE.collection].aggregate(evaluate(_NODE.query)).exec(function(err,data){
		 	if(err) 
		 		callback(null, "results","pageCount", "count"); 	
		  callback(null, data,"pageCount", "count"); 	
		 });
		
	},
	result:function(err,results,pageCount, count){
		//console.log(JSON.stringify(results));
		savefile(JSON.stringify(results,null,5)).then((resp)=>{
			console.log("done");
		});
}
}
function show(data){
//	console.log(JSON.stringify(data,null,5));
	for(var i=0;i<data.length;i++)
		{
		    // if(data[i].query == undefined)
		    // 	savefile(data[i].tag)
		    if(data[i].query)
		    {
				queryExec(data[i]);
		    }
		    if(data[i].children.length > 0)
		    {
		    	show(data[i].children);
		    }
		}
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