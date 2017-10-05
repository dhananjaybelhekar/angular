db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
       "directoryId": ObjectId("57189cd924d8bc65f4123bc3"),
         "status" : ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 2
    {
      $unwind: "$address"
    },

    // Stage 3
    {
      $match: {
      "address.addressType":{$in:[null]}
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

);
