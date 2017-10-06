db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
       "directoryId": ObjectId("57189cd924d8bc65f4123bc3"),
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
      "address.addressType":{$in:[null]}
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

).forEach(function(data){
  if(data.address.addressType == null || data.address.addressType == undefined)
  {
   data.address= { addressType : ObjectId("59d5d1c760ce9bbfb2f7fc1f") }
  }
  for(var i=)
})