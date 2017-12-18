db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
      "directoryId" : ObjectId("57189cc224d8bc65f4123bc1"), 
      "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
      "active" : true, 
      "deleted" : false, 
      }
    },

    // Stage 2
    {
      $unwind: "$personnel"
    },

    // Stage 3
    {
      $lookup: {
          "from" : "txn_personnels",
          "localField" : "personnel",
          "foreignField" : "_id",
          "as" : "personnel"
      }
    },

    // Stage 4
    {
      $unwind: "$personnel"
    },

    // Stage 5
    {
      $match: {
      "personnel.deletedFlag" : true
      }
    },

    // Stage 6
    {
      $group: {
      _id:null,
      personnel:{$addToSet:"$personnel._id"}
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
