var mongoose = require('mongoose');
var json2csv = require('json2csv');
//var fun = require("./query.js");
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
 db.org1 = mongoose.model('TXN_Organization',orgScgema);
var per = mongoose.model('TXN_Personnels',{});
//var dbtemp = mongoose.model('TXN_Temp',{data:Schema.Types.Mixed });

var dbtemp = mongoose.model('TXN_Temp',new mongoose.Schema({
	personnel:Schema.Types.Mixed,
	chapterSpecification:Schema.Types.Mixed
},{strict: false}));
var chapter = mongoose.model('TXN_Chapterspecifications',{});
var  _COUNT = 1;
var options = { page : _COUNT, limit : 5000, allowDiskUse: true };
var d= {
	 fun1:function(callback) {
		var aggregate=db['org1'].aggregate(
		  [
		    {
		      $match: {    "directoryId" : new mongoose.Types.ObjectId("57189cc224d8bc65f4123bc1"), 
		          "status" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb"), 
		          "workflowStatus" : new mongoose.Types.ObjectId("57283b4214dde6a43b46a7bb"),
		          "listingType":{ $elemMatch: { 
		             "listingName":"Venture Capital",
		      		"listingActive" : true 
		      	}
		      }
		      }
		    },
		    {
		      $unwind: "$listingType"
		    },
		    {
		      $match: {
		      "listingType.listingName":"Venture Capital",
		      "listingType.listingActive" : true
		      }
		    },
		    {
		      $sort: {
		      "name":1
		      }
		    },
		    {
		    	$project:{
		    		org_id:1,
		    		name:1,
		    		address:1,
		    		contact:1,
		    		personnel:1,
					chapterSpecification:1
		    	}
		    }
		  ]
		);
	db['org1'].aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
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
	}
	,
	fun2:function(arg1data,pageCount, count,callback){
		 per.populate(arg1data, {path: 'personnel'}, function(err, populatedTransactions) {
		            callback(null,populatedTransactions,pageCount, count);
		  });
	},
	fun3:function(arg1data,pageCount, count,callback){
		 chapter.populate(arg1data, {path: 'chapterSpecification',match:{}}, function(err, populatedTransactions) {
		            callback(null,populatedTransactions,pageCount, count);
		  });
	}	
	,
	fun4:function(arg1,pageCount, count,callback) {
		// console.log(JSON.stringify(arg1,null,4));
	//	saveInToDb(arg1);
     // fs.appendFile('OMDD.csv', JSON.stringify(arg1,null,4), function(err) {
     //    if (err) throw err;
     //  });
        callback(null,pageCount, count);
     },
     result:function (err, pageCount, count) {

     	if(_COUNT <= pageCount)
     	{
     		_COUNT +=1;
     		main();
     	}else
     	{
     		console.log("DONE");
     	}
    	
	}
}

function main(){
		async.waterfall([d.fun1,d.fun2,d.fun3,d.fun4], d.result);	
}
function saveInToDb(data){
	
	 data.map(function(d){
	 	console.log(d);
		// delete d._id;
		// var kitty = new dbtemp(d);
		// kitty.save(function (err) {
		//   if (err) {
		//     console.log(err);
		//   } else {
		//     console.log('meow');
		//   }
		// });
	 })
}

module.exports = {
	getAll:function(){
		main();
	},
	getPersonnel:function(){

	}
};
