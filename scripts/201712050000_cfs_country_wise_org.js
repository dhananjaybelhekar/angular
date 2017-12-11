db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
        "directoryId" : ObjectId("57189cc224d8bc65f4123bc1"), 
        "ownerCountry":{$ne:null}
      }
    },

    // Stage 2
    {
      $group: {
      _id:{"ownerCountry":"$ownerCountry"},
      "orgName":{$addToSet:"$name"}
      }
    },

    // Stage 3
    {
      $sort: {
      "_id":1,
      "orgName":1
      }
    }

  ]

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

);
