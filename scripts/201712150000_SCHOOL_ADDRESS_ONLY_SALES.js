db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
          "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "classificationCode" : {
              "$in" : [
                  ObjectId("57726c33c19c305dc5b1b352"), 
                  ObjectId("57726c33c19c305dc5b1b353")
              ]
          },
            "address": { $exists: true } 
      }
    },

    // Stage 2
    {
      $unwind: "$address"
    },

    // Stage 3
    {
      $project: {
          "cmpMailingAddress" : {
                    "$cmp" : [
      	              //Mailing Address
                        ObjectId("576286d0c19cef300bc720e5"), 
                        "$address.addressType"
                    ]
                },
      	"cmpPhysicalAddress" : {
                    "$cmp" : [
                    //physical 
                        ObjectId("576286d0c19cef300bc720e6"), 
                        "$address.addressType"
                    ]
                },
        	"cmpPMA" : {
                    "$cmp" : [
                // p/m
                        ObjectId("57726e42c19c3451796ea561"), 
                        "$address.addressType"
                    ]
                }
      
      }
    },

    // Stage 4
    {
      $match: {
      "cmpMailingAddress":-1,
      "cmpPhysicalAddress":-1,
      "cmpPMA":-1,
      }
    },

    // Stage 5
    {
      $group: {
      _id:null,
      id:{$addToSet:"$_id"}
      }
    },

    // Stage 6
    {
      $unwind: "$id"
    },

    // Stage 7
    {
      $lookup: {
          "from" : "txn_organizations",
          "localField" : "id",
          "foreignField" : "_id",
          "as" : "id"
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
