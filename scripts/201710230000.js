

db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
          "directoryId": ObjectId("57189cd924d8bc65f4123bc3"), 
        "classificationCode": ObjectId("57726c33c19c305dc5b1b354"),
        "status": ObjectId("57283b4214dde6a43b46a7bb"), 
      
      }
    },

    // Stage 2
    {
      $unwind: {
            path: "$address",
            preserveNullAndEmptyArrays:true
      }
    },

    // Stage 3
    {
      $match: {
       "address.addressType":{$nin:[ ObjectId("57726e42c19c3451796ea55f"),ObjectId("57726e42c19c3451796ea562")]},
       "address.deleted" : {"$in" : [false, null]}
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

).toArray().length