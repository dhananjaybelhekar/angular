db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
          "classificationCode" : {
              "$nin" : [
                  ObjectId("57726c33c19c305dc5b1b350"), 
                  ObjectId("57726c33c19c305dc5b1b34d"), 
                  ObjectId("57726c33c19c305dc5b1b34f"), 
                  ObjectId("57726c33c19c305dc5b1b352"), 
                  ObjectId("57726c33c19c305dc5b1b353")
              ]
          }, 
          "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "name" : {
              "$exists" : true
          }, 
          "notes.note" : {
              "$nin" : [
                  /closed/i, 
                  /consol/i
              ]
          }, 
          "parentName" : {
              "$nin" : [
                  /archive/i, 
                  /records/i
              ]
          }
      }
    },

    // Stage 2
    {
      $lookup: { 
          "from" : "txn_organizations", 
          "localField" : "parentId", 
          "foreignField" : "_id", 
          "as" : "parentId"
      }
    },

    // Stage 3
    {
      $unwind: "$parentId"
    },

    // Stage 4
    {
      $unwind: "$address"
    },

    // Stage 5
    {
      $match: { 
          "address.addressType" : {
              "$nin" : [
                  ObjectId("57726e42c19c3451796ea55f"), 
                  ObjectId("57726e42c19c3451796ea562")
              ]
          }
      }
    },

    // Stage 6
    {
      $sort: { 
          "orgIdNumber" : 1
      }
    },

    // Stage 7
    {
      $project: { 
          "classificationCodeName" : 1, 
          "org_id" : 1, 
          "abbrevationName" : 1, 
          "name" : 1, 
          "EINumber" : 1, 
          "address.sequenceNo" : 1, 
          "address.addressType" : 1, 
          "address.street1" : 1, 
          "address.street2" : 1, 
          "address.cityName" : 1, 
          "address.stateName" : 1, 
          "address.countryName" : 1, 
          "address.mailingIndex" : 1, 
          "parentId.org_id" : 1, 
          "parentId.classificationCodeName" : 1, 
          "parentId.name" : 1, 
          "parishShrine.parishStatusName" : 1, 
          "orgIdNumber" : 1, 
          "notes.note" : 1, 
          "parentName" : 1, 
          "parentId.address.sequenceNo" : 1, 
          "parentId.address.addressType" : 1, 
          "parentId.address.street1" : 1, 
          "parentId.address.street2" : 1, 
          "parentId.address.cityName" : 1, 
          "parentId.address.stateName" : 1, 
          "parentId.address.countryName" : 1, 
          "parentId.address.zip" : 1, 
          "parentId.address.mailingIndex" : 1
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
