module.exports = {
	fun1:function(){}
}

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

1			org1			NULL
2			aggregate		1
