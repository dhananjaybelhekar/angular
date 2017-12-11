db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cc224d8bc65f4123bc1"), 
          "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "workflowStatus" : ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 2
    {
      $unwind: "$listingType"
    },

    // Stage 3
    {
      $match: { 
          "listingType.listing" : ObjectId("577e24b8c19c4090a8aee1ec")
      }
    },

    // Stage 4
    {
      $unwind: "$personnel"
    },

    // Stage 5
    {
      $lookup: { 
          "from" : "txn_personnels", 
          "localField" : "personnel", 
          "foreignField" : "_id", 
          "as" : "personnel"
      }
    },

    // Stage 6
    {
      $unwind: "$personnel"
    },

    // Stage 7
    {
      $unwind: "$personnel.officers"
    },

    // Stage 8
    {
      $group: { 
          "_id" : {
              "_id" : "$_id", 
              "personnelType" : "$personnel.officers.listingTypeName"
          }, 
          "id" : {
                  "chapterSpecification" : "$chapterSpecification", 
                  "personnel" : {
                      $addToSet : "$personnel"
                  }
              }
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
