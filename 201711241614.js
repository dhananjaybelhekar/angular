db.txn_personnels.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
       "directoryId" : ObjectId("57189cc224d8bc65f4123bc1"), 
      }
    },

    // Stage 2
    {
      $unwind: "$officers"
    },

    // Stage 3
    {
      $group: {
      _id:{
        "listingTypeName":"$officers.listingTypeName"
        },
        "OrgId":{$addToSet:"$orgId"}
      }
    },

    // Stage 4
    {
      $unwind: "$OrgId"
    },

    // Stage 5
    {
      $lookup: { 
          "from" : "txn_organizations", 
          "localField" : "OrgId", 
          "foreignField" : "_id", 
          "as" : "OrgId"
      }
    },

    // Stage 6
    {
      $unwind: "$OrgId"
    },

    // Stage 7
    {
      $match: {
         "OrgId.status" : ObjectId("57283b4214dde6a43b46a7bb"), 
         "OrgId.workflowStatus" : ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 8
    {
      $group: {
      _id:"$_id.listingTypeName",
      "data":{$addToSet:"$OrgId"}
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
