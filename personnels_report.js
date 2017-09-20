db.txn_personnels.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {  "directoryId": ObjectId("57189b3e24d8bc65f4123bbf"), "active": true, "deleted": false }
    },

    // Stage 2
    {
      $unwind: "$orgId"
    },

    // Stage 3
    {
      $lookup: {
          "from" : "txn_organizations",
          "localField" : "orgId",
          "foreignField" : "_id",
          "as" : "orgId"
      }
    },

    // Stage 4
    {
      $unwind: "$orgId"
    },

    // Stage 5
    {
      $project: {
      "orgId.org_id":1,
      "orgId._id":1,
      "orgId.name":1,
      "name.prefix":1,
      "name.first":1,
      "name.middle":1,
      "name.last":1,
      "name.suffix":1,
      "phoneNumbers":1,
      "address":1,
      "email.primary":1,
      "faxNumbers":1
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
