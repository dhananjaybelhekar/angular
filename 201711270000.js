db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {    "directoryId" : ObjectId("57189cc224d8bc65f4123bc1"), 
          "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "workflowStatus" : ObjectId("57283b4214dde6a43b46a7bb"),
          "listingType":{ $elemMatch: { 
             "listingName":"Venture Capital",
      		"listingActive" : true 
      	}
      }
      }
    },

    // Stage 2
    {
      $unwind: "$listingType"
    },

    // Stage 3
    {
      $match: {
      "listingType.listingName":"Venture Capital",
      "listingType.listingActive" : true
      }
    },

    // Stage 4
    {
      $sort: {
      "name":1
      }
    }

  ]

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

);
