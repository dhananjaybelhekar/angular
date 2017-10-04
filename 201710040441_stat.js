printjson(db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
      	"directoryId" : ObjectId("57189cd924d8bc65f4123bc3"),
      	"status" : ObjectId("57283b4214dde6a43b46a7bb"),
      }
    },

    // Stage 2
    {
      $unwind: "$statistic"
    },

    // Stage 3
    {
      $project: {
      "orgIdNumber":1,
      "classificationCode":1,
      "name":1,
      "abbrevationName":1,
      "dioceseType":1,
      "sequenceNo":1,
      "statistic":1,
      "parentId":1
      }
    },

    // Stage 4
    {
      $lookup: {
          "from" : "mst_refcodevalues",
          "localField" : "dioceseType",
          "foreignField" : "_id",
          "as" : "dioceseType"
      }
    },

    // Stage 5
    {
      $unwind: "$dioceseType"
    },

    // Stage 6
    {
      $project: {
      "orgIdNumber":1,
      "classificationCode":1,
      "name":1,
      "abbrevationName":1,
      "dioceseType.codeValue":1,
      "sequenceNo":1,
      "statistic":1,
      "parentId":1,
      }
    },

    // Stage 7
    {
      $lookup: {
          "from" : "mst_refcodevalues",
          "localField" : "statistic.statisticType",
          "foreignField" : "_id",
          "as" : "statistic.statisticType"
      }
    },

    // Stage 8
    {
      $unwind: "$statistic.statisticType"
    },

    // Stage 9
    {
      $project: {
      "orgIdNumber":1,
      "classificationCode":1,
      "name":1,
      "abbrevationName":1,
      "dioceseType.codeValue":1,
      "sequenceNo":1,
      "statistic":1,
      "parentId":1,
      
      }
    },

    // Stage 10
    {
      $lookup: {
          "from" : "mst_refcodevalues",
          "localField" : "classificationCode",
          "foreignField" : "_id",
          "as" : "classificationCode"
      }
    },

    // Stage 11
    {
      $unwind: "$classificationCode"
    }
  ],

  // Options
  {
    cursor: {
      batchSize: 50
    }
  }

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

).toArray());