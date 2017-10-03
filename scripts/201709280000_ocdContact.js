db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
          "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "active" : true, 
          "deleted" : false
      }
    },

    // Stage 2
    {
      $sort: { 
      "orgIdNumber":1
      }
    },

    // Stage 3
    {
      $lookup: { 
          "from" : "txn_organizations", 
          "localField" : "parentId", 
          "foreignField" : "_id", 
          "as" : "parentId"
      }
    },
    // Stage 4
    {
      $unwind: "$parentId"
    },
    // Stage 5
    {
      $unwind: "$ocdContact"
    },
    // Stage 6
    {
      $unwind: "$ocdContact.contactType"
    },
    // Stage 7
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "ocdContact.contactType", 
          "foreignField" : "_id", 
          "as" : "ocdContact.contactType"
      }
    },
    // Stage 8
    {
      $unwind: "$ocdContact.contactType"
    },
    // Stage 9
    {
      $project: { 
          "abbrevationName" : 1, 
          "classificationCodeName" : 1, 
          "orgIdNumber" : 1, 
          "name" : 1, 
          "ocdContact.contactType.description" : 1, 
          "ocdContact.sequenceNo" : 1, 
          "ocdContact.contactDetails" : 1, 
          "ocdContact.extension" : 1, 
          "ocdContact.note" : 1, 
          "parentId.orgIdNumber" : 1, 
          "parentId.name" : 1
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
