db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cc224d8bc65f4123bc1"), 
          "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "active" : true, 
          "deleted" : false
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
          "personnel.name.last" : {
              "$nin" : [
                  null, 
                  ""
              ]
          }, 
          "personnel.deletedFlag" : false
      }
    },

    // Stage 6
    {
      $project: { 
          "personnel.name" : 1
      }
    },

    // Stage 7
    {
      $sort: { 
          "personnel.name.last" : 1
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
