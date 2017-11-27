var mongoose = require('mongoose');
var json2csv = require('json2csv');
var fun = require("./query.js");
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
var org1 = mongoose.model('TXN_Organization',orgScgema);
var per = mongoose.model('TXN_Personnels',{});
var chapter = mongoose.model('TXN_Chapterspecifications',{});

var options = { page : 1, limit : 5000, allowDiskUse: true };
var d= {
	 fun1:function(callback) {
		var aggregate=org1.aggregate(
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
		    }

		  ]
		);
	org1.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
		console.log("pageCount",pageCount,"=","count",count);
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
	fun3:function(arg1data,pageCount, count,callback){
		 per.populate(arg1data, {path: 'personnel'}, function(err, populatedTransactions) {
		            callback(null,populatedTransactions,pageCount, count);
		  });
	},
	fun4:function(arg1data,pageCount, count,callback){
		 chapter.populate(arg1data, {path: 'chapterSpecification'}, function(err, populatedTransactions) {
		            callback(null,populatedTransactions,pageCount, count);
		  });
	},
	fun2:function(arg1,pageCount, count,callback) {
	
 //    	console.log("function2",pageCount, count)
	// var fields=['org_id','listingType.listingName'];
 //   	var csv = json2csv({ data: arg1, fields: fields }); 
     fs.appendFile('OMDD.csv', JSON.stringify(arg1,null,4), function(err) {
        if (err) throw err;
      });
        callback(null,'DONE');
     }
}

module.exports = [d.fun1,d.fun3,d.fun4,d.fun2];