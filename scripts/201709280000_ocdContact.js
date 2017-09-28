db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
       "directoryId": ObjectId("57189cd924d8bc65f4123bc3"), "status": ObjectId("57283b4214dde6a43b46a7bb"), "active": true, "deleted": false
      }
    },

    // Stage 2
    {
      $unwind: "$ocdContact"
    },

    // Stage 3
    {
      $sort: {
      "orgIdNumber":1
      }
    },

    // Stage 4
    {
      $project: {
      "abbrevationName":1,
      "classificationCodeName":1,
      "orgIdNumber":1,
      "name":1,
      "ocdContact.contactTypeName":1,
      "ocdContact.sequenceNo":1,
      "ocdContact.contactDetails":1,
      "ocdContact.extension":1,
      "ocdContact.note":1,
      "parentId":1
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
