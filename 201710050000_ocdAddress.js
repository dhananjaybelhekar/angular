db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
       "directoryId": ObjectId("57189cd924d8bc65f4123bc3"),
         "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
         "org_id" : "100019", 
      }
    },

    // Stage 2
    {
      $unwind: "$address"
    },

    // Stage 3
    {
      $match: {
      "address.deleted":{$in:[false,null]}
      }
    },

    // Stage 4
    {
      $project: {
      "status":1,
      "orgIdNumber":1,
      "classificationCode":1,
      "name":1,
      "address":1,
      "parentId":1
      }
    },

    // Stage 5
    {
      $lookup: {          
        "from" : "mst_refcodevalues", 
        "localField" : "classificationCode", 
        "foreignField" : "_id", 
        "as" : "classificationCode"
      }
    },

    // Stage 6
    {
      $unwind: "$classificationCode"
    },

    // Stage 7
    {
      $lookup: {          
        "from" : "txn_organizations", 
        "localField" : "parentId", 
        "foreignField" : "_id", 
        "as" : "parentId"
      }
    },

    // Stage 8
    {
      $unwind: "$parentId"
    },

    // Stage 9
    {
      $lookup: {          
        "from" : "mst_refcodevalues", 
        "localField" : "address.addressType", 
        "foreignField" : "_id", 
        "as" : "address.addressType"
      }
    },

    // Stage 10
    {
      $unwind: "$address.addressType"
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
