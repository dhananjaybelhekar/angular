db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
      "directoryId":ObjectId("57189cd924d8bc65f4123bc3"),
      "status" : ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 2
    {
      $unwind: "$address"
    },

    // Stage 3
    {
      $match: {
      "address.addressType":{$nin:[ObjectId("57726e42c19c3451796ea55f"),ObjectId("57726e42c19c3451796ea562")]}
      }
    },

    // Stage 4
    {
      $project: {
         "status":1,
         "orgIdNumber":1,
         "classificationCodeName":1,
         "name":1,
         "address.addressType":1,
         "address.sequenceNo":1,
         "address.mailingIndex":1,
         "address.header":1,
         "address.organizationName":1,
         "address.street1":1,
         "address.street2":1,
         "address.cityName":1,
         "address.stateAbbreviation":1,
         "address.zip":1,
         "address.countyName":1,
         "parentId":1
       }
    },

    // Stage 5
    {
      $lookup: {
          "from" : "txn_organizations",
          "localField" : "parentId",
          "foreignField" : "_id",
          "as" : "parentId"
      }
    },

    // Stage 6
    {
      $unwind: "$parentId"
    },

    // Stage 7
    {
      $project: {
         "status":1,
         "orgIdNumber":1,
         "classificationCodeName":1,
         "name":1,
         "address.addressType":1,
         "address.sequenceNo":1,
         "address.mailingIndex":1,
         "address.header":1,
         "address.organizationName":1,
         "address.street1":1,
         "address.street2":1,
         "address.cityName":1,
         "address.stateAbbreviation":1,
         "address.zip":1,
         "address.countyName":1,
         "parentId.classificationCodeName":1,
         "parentId.org_id":1,
         "parentId.name":1
         }
    }
  ],

  // Options
  {
    cursor: {
      batchSize: 50
    }
  }

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

);
