db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
          "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "active" : true, 
          "deleted" : false, 
          "personnel" : {
              "$exists" : true, 
              "$ne" : [
      
              ]
          }
      }
    },

    // Stage 2
    {
      $project: { 
          "abbrevationName" : 1, 
          "classificationCodeName" : 1, 
          "orgIdNumber" : 1, 
          "name" : 1, 
          "established.year" : 1, 
          "personnel" : {
              "$setUnion" : [
                  "$personnel", 
                  [
      
                  ]
              ]
          }
      }
    },

    // Stage 3
    {
      $sort: { 
          "orgIdNumber" : 1
      }
    },

    // Stage 4
    {
      $unwind: "$personnel"
    },

    // Stage 5
    {
      $lookup: { 
          "from" : "txn_personnels", 
          "localField" : "personnel", 
          "foreignField" : "_id", 
          "as" : "personnel"
      }
    },

    // Stage 6
    {
      $unwind: "$personnel"
    },

    // Stage 7
    {
      $match: { 
          "personnel.directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
          "personnel.status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "$or" : [
              {
                  "personnel.died" : null
              }, 
              {
                  "personnel.died.day" : null
              }, 
              {
                  "personnel.died.month" : null
              }, 
              {
                  "personnel.died.year" : null
              }
          ]
      }
    },

    // Stage 8
    {
      $unwind: "$personnel.assignment"
    },

    // Stage 9
    {
      $match: { 
          "personnel.assignment.status" : ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 10
    {
      $lookup: { 
          "from" : "txn_organizations", 
          "localField" : "personnel.assignment.orgId", 
          "foreignField" : "_id", 
          "as" : "personnel.assignment.orgId"
      }
    },

    // Stage 11
    {
      $unwind: "$personnel.assignment.orgId"
    },

    // Stage 12
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "personnel.personType", 
          "foreignField" : "_id", 
          "as" : "personnel.personType"
      }
    },

    // Stage 13
    {
      $unwind: "$personnel.personType"
    },

    // Stage 14
    {
      $lookup: { 
          "from" : "txn_organizations", 
          "localField" : "personnel.assignment.orgId.parentId", 
          "foreignField" : "_id", 
          "as" : "personnel.assignment.orgId.parentId"
      }
    },

    // Stage 15
    {
      $unwind: "$personnel.assignment.orgId.parentId"
    },

    // Stage 16
    {
      $match: { 
          "personnel.assignment.orgId.classificationCode" : {
              "$nin" : [
                  ObjectId("57726c33c19c305dc5b1b36c"), 
                  ObjectId("57726c33c19c305dc5b1b34f")
              ]
          }
      }
    },

    // Stage 17
    {
      $project: { 
          "abbrevationName" : 1, 
          "classificationCodeName" : 1, 
          "orgIdNumber" : 1, 
          "name" : 1, 
          "established.year" : 1, 
          "personnel.assignment.assignId" : 1, 
          "personnel.assignment.assignType" : 1, 
          "personnel.assignment.status" : 1, 
          "personnel.personType.description" : 1, 
          "personnel.PeopleId" : 1, 
          "personnel.very" : 1, 
          "personnel.title" : 1, 
          "personnel.name.prefix" : 1, 
          "personnel.name.first" : 1, 
          "personnel.name.middle" : 1, 
          "personnel.name.last" : 1, 
          "personnel.name.suffix" : 1, 
          "personnel.religiousOrderInitials" : 1, 
          "personnel.assignment.title" : 1, 
          "personnel.retired" : 1, 
          "personnel.ordination.ordination_year" : 1, 
          "personnel.homeDiocese" : 1, 
          "personnel.homeNation" : 1, 
          "personnel.assignment.orgId.orgIdNumber" : 1, 
          "personnel.assignment.orgId.name" : 1, 
          "personnel.assignment.orgId.parentId.orgIdNumber" : 1, 
          "personnel.assignment.orgId.parentId.name" : 1, 
          "personnel.died" : 1, 
          "cmp" : {
              "$cmp" : [
                  "$orgIdNumber", 
                  "$personnel.assignment.orgId.orgIdNumber"
              ]
          }
      }
    },

    // Stage 18
    {
      $match: { 
          "cmp" : 0
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
