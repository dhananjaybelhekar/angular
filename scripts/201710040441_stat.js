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
      $unwind: "$statistic"
    },

    // Stage 3
    {
      $match: {
        "statistic.deleted": {$in:[false,null]}
      }
    },

    // Stage 4
    {
      $project: { 
          "orgIdNumber" : 1, 
          "classificationCode" : 1, 
          "name" : 1, 
          "abbrevationName" : 1, 
          "dioceseType" : 1, 
          "sequenceNo" : 1, 
          "statistic" : 1, 
          "parentId" : 1
      }
    },

    // Stage 5
    {
      $project: { 
          "orgIdNumber" : 1, 
          "classificationCode" : 1, 
          "name" : 1, 
          "abbrevationName" : 1, 
          "dioceseType.codeValue" : 1, 
          "sequenceNo" : 1, 
          "statistic" : 1, 
          "parentId" : 1
      }
    },

    // Stage 6
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "statistic.statisticType", 
          "foreignField" : "_id", 
          "as" : "statistic.statisticType"
      }
    },

    // Stage 7
    {
      $unwind: "$statistic.statisticType"
    },

    // Stage 8
    {
      $match: {
         "statistic.statisticType.level":"O"
      }
    },

    // Stage 9
    {
      $lookup: {
          "from" : "txn_organizations",
          "localField" : "parentId",
          "foreignField" : "_id",
          "as" : "parentId"
      }
    },

    // Stage 10
    {
      $unwind: "$parentId"
    },

    // Stage 11
    {
      $project: { 
          "orgIdNumber" : 1, 
          "classificationCode" : 1, 
          "name" : 1, 
          "abbrevationName" : 1, 
          "dioceseType.codeValue" : 1, 
          "sequenceNo" : 1, 
          "statistic" : 1, 
          "parentId.name" : 1,
          "parentId.orgIdNumber" : 1,
           "parentId.classificationCode" : 1
      }
    },

    // Stage 12
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "classificationCode", 
          "foreignField" : "_id", 
          "as" : "classificationCode"
      }
    },

    // Stage 13
    {
      $unwind: "$classificationCode"
    },

    // Stage 14
    {
      $sort: {
      "orgIdNumber":1
      }
    },

    // Stage 15
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "parentId.classificationCode", 
          "foreignField" : "_id", 
          "as" : "parentId.classificationCode"
      }
    },

    // Stage 16
    {
      $unwind: "$parentId.classificationCode"
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

).forEach(function(data){
  delete data._id;
  db.statdbo.save(data);
})

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
      $unwind: "$statistic"
    },

    // Stage 3
    {
      $match: {
        "statistic.deleted": {$in:[false,null]}
      }
    },

    // Stage 4
    {
      $project: { 
          "orgIdNumber" : 1, 
          "classificationCode" : 1, 
          "name" : 1, 
          "abbrevationName" : 1, 
          "dioceseType" : 1, 
          "sequenceNo" : 1, 
          "statistic" : 1, 
          "parentId" : 1
      }
    },

    // Stage 5
    {
      $project: { 
          "orgIdNumber" : 1, 
          "classificationCode" : 1, 
          "name" : 1, 
          "abbrevationName" : 1, 
          "dioceseType.codeValue" : 1, 
          "sequenceNo" : 1, 
          "statistic" : 1, 
          "parentId" : 1
      }
    },

    // Stage 6
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "statistic.statisticType", 
          "foreignField" : "_id", 
          "as" : "statistic.statisticType"
      }
    },

    // Stage 7
    {
      $unwind: "$statistic.statisticType"
    },

    // Stage 8
    {
      $match: {
         "statistic.statisticType.level":"D"
      }
    },

    // Stage 9
    {
      $lookup: {
          "from" : "txn_organizations",
          "localField" : "parentId",
          "foreignField" : "_id",
          "as" : "parentId"
      }
    },

    // Stage 10
    {
      $unwind: "$parentId"
    },

    // Stage 11
    {
      $project: { 
          "orgIdNumber" : 1, 
          "classificationCode" : 1, 
          "name" : 1, 
          "abbrevationName" : 1, 
          "dioceseType.codeValue" : 1, 
          "sequenceNo" : 1, 
          "statistic" : 1, 
          "parentId.name" : 1,
          "parentId.orgIdNumber" : 1,
           "parentId.classificationCode" : 1
      }
    },

    // Stage 12
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "classificationCode", 
          "foreignField" : "_id", 
          "as" : "classificationCode"
      }
    },

    // Stage 13
    {
      $unwind: "$classificationCode"
    },

    // Stage 14
    {
      $sort: {
      "orgIdNumber":1
      }
    },

    // Stage 15
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "parentId.classificationCode", 
          "foreignField" : "_id", 
          "as" : "parentId.classificationCode"
      }
    },

    // Stage 16
    {
      $unwind: "$parentId.classificationCode"
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

).forEach(function(data){
  delete data._id;
  db.statdbd.save(data);
})