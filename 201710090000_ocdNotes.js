db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
          "status" : ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 2
    {
      $sort: { 
          "orgIdNumber" : 1
      }
    },

    // Stage 3
    {
      $unwind: "$notes"
    },

    // Stage 4
    {
      $match: { 
          "notes.deleted" : {
              "$in" : [
                  false, 
                  null
              ]
          }
      }
    },

    // Stage 5
    {
      $project: { 
          "status" : 1, 
          "orgIdNumber" : 1, 
          "classificationCode" : 1, 
          "name" : 1, 
          "notes" : 1, 
          "parentId" : 1
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
