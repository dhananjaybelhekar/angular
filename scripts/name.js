db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
          "classificationCode" : ObjectId("57726c33c19c305dc5b1b36d"),
           "directoryId": ObjectId("57189cd924d8bc65f4123bc3") 
      }
    },

    // Stage 2
    {
      $lookup: {
          "from" : "txn_organizations",
          "localField" : "root",
          "foreignField" : "_id",
          "as" : "root"
      }
    },

    // Stage 3
    {
      $project: {
         	"name" : 1, 
          "abbrevationName" : 1, 
          "root.address" : 1,
      /*
      	"root.0.address":{  
      	  $filter: {
      				input: "$root.0.address",
      				as: "roota",               
      				cond: { $eq:["$$roota.considerThisAddress",true]}
                  	}
      	}*/
      
      }
    }
  ],

  // Options
  {
    cursor: {
      batchSize: 50
    },
    allowDiskUse: true
  }

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

).forEach(function(data){
	for(var i=0;i<data.root[0].address.length;i++)
	{
	if(data.root[0].address[i].considerThisAddress==true)
	{
	data.rootStateAbbreviation=data.root[0].address[i].stateAbbreviation;
	}
	}
	db.txn_organizations.save(data);
});
