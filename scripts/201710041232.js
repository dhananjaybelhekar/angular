db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
          "classificationCode" : {
              "$nin" : [
                  ObjectId("57726c33c19c305dc5b1b36c"), 
                  ObjectId("57726c33c19c305dc5b1b34f")
              ]
          }, 
          "status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "active" : true, 
          "deleted" : false
      }
    },

    // Stage 2
    {
      $unwind: "$personnel"
    },

    // Stage 3
    {
      $lookup: { 
          "from" : "txn_personnels", 
          "localField" : "personnel", 
          "foreignField" : "_id", 
          "as" : "personnel"
      }
    },

    // Stage 4
    {
      $unwind: "$personnel"
    },

    // Stage 5
    {
      $unwind: "$personnel.assignment"
    },

    // Stage 6
    {
      $project: { 
          "abbrevationName" : 1, 
          "classificationCodeName" : 1, 
          "orgIdNumber" : 1, 
          "name" : 1, 
          "established.year" : 1, 
          "personnel.status" : 1, 
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
          "personnel.assignment.orgId" : 1, 
          "personnel.died" : 1, 
          "cmp" : {
              "$cmp" : [
                  "$_id", 
                  "$personnel.assignment.orgId"
              ]
          }
      }
    },

    // Stage 7
    {
      $match: { 
          "cmp" : 0
      }
    },

    // Stage 8
    {
      $match: { 
          "personnel.status" : ObjectId("57283b4214dde6a43b46a7bb"), 
          "personnel.assignment.status" : ObjectId("57283b4214dde6a43b46a7bb"),
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

    // Stage 9
    {
      $lookup: {
          "from" : "txn_organizations",
          "localField" : "personnel.assignment.orgId",
          "foreignField" : "_id",
          "as" : "personnel.assignment.orgId"
      }
    },

    // Stage 10
    {
      $unwind: "$personnel.assignment.orgId"
    },

    // Stage 11
    {
      $lookup: {
          "from" : "txn_organizations",
          "localField" : "personnel.assignment.orgId.parentId",
          "foreignField" : "_id",
          "as" : "personnel.assignment.orgId.parentId"
      }
    },

    // Stage 12
    {
      $unwind: "$personnel.assignment.orgId.parentId"
    },

    // Stage 13
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
                "cmp":1
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
