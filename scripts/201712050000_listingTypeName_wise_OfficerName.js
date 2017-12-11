db.txn_personnels.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
        "directoryId" : ObjectId("57189cc224d8bc65f4123bc1"), 
         "activeFlag" : true, 
          "deletedFlag" : false, 
          "active" : true, 
      }
    },

    // Stage 2
    {
      $unwind: "$officers"
    },

    // Stage 3
    {
      $group: {
      _id:{listingTypeName:"$officers.listingTypeName"},
      
        	"OfficerTypeName":{$addToSet:"$officers.OfficerTypeName"},
        	
      
      }
    },

    // Stage 4
    {
      $sort: {
      "_id.listingTypeName":1,
      "OfficerTypeName":1,
      }
    }
  ],

  // Options
  {
    cursor: {
      batchSize: 50
    }
  }

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

);
