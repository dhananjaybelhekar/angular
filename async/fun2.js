var mongoose = require('mongoose');
var json2csv = require('json2csv');
//var fun = require("./query.js");
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

orgScgema.plugin(mongooseAggregatePaginate);

var db={};

db.txn_organizations = mongoose.model('TXN_Organization',orgScgema);

db.txn_personnels = mongoose.model('TXN_Personnels',{});

db.txn_temp= mongoose.model('TXN_Temp',new mongoose.Schema({

},{strict: false}));


db.txn_chapterspecifications = mongoose.model('TXN_Chapterspecifications',{});

var  _COUNT = 1;

var options = { page : _COUNT, limit : 5000, allowDiskUse: true };

module.exports  = {
	exec:function(data){
		show(addChildren(data));
	}
}

function show(data){
			 for(var i=0;i<data.length;i++)
		    {
		    	if(data[i].qr == undefined)
		    		savefile(data[i].parent,data[i].tag)
		        if(data[i].children.length > 0)
		        show(data[i].children);
		    }
}
function savefile(space,tag,value=""){
	 fs.appendFile('xml.txt',tag+value+'\n', function(err) {
        if (err) throw err;
      });
}
function bunflatten(nodes) {
    var map = {}, _node, roots = [];
    for (var i = 0; i < nodes.length; i += 1) {
        _node = nodes[i];
        _node.children = [];
        map[_node.id] = i;
        // use map to look-up the parents
        if (_node.parent !== 1) {
            _node.children = [];
            nodes[map[_node.parent]].children.push(_node);
        } else {
            roots.push(_node);
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