db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
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
      $match: { 
         "personnel.directoryId": ObjectId("57189cd924d8bc65f4123bc3"), 
          "personnel.status": ObjectId("57283b4214dde6a43b46a7bb"), 
          $or: [ 
          { "personnel.died": null }, 
          { "personnel.died.day": null }, 
          { "personnel.died.month": null }, 
          { "personnel.died.year": null } 
          ] 
      }
    },

    // Stage 6
    {
      $unwind: "$personnel.assignment"
    },

    // Stage 7
    {
      $match: { 
          "personnel.assignment.status" : ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 8
    {
      $lookup: { 
          "from" : "txn_organizations", 
          "localField" : "personnel.assignment.orgId", 
          "foreignField" : "_id", 
          "as" : "personnel.assignment.orgId"
      }
    },

    // Stage 9
    {
      $unwind: "$personnel.assignment.orgId"
    },

    // Stage 10
    {
      $lookup: { 
          "from" : "mst_refcodevalues", 
          "localField" : "personnel.personType", 
          "foreignField" : "_id", 
          "as" : "personnel.personType"
      }
    },

    // Stage 11
    {
      $unwind: "$personnel.personType"
    },

    // Stage 12
    {
      $lookup: { 
          "from" : "txn_organizations", 
          "localField" : "personnel.assignment.orgId.parentId", 
          "foreignField" : "_id", 
          "as" : "personnel.assignment.orgId.parentId"
      }
    },

    // Stage 13
    {
      $unwind: "$personnel.assignment.orgId.parentId"
    },

    // Stage 14
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
          "personnel.assignment.orgId.orgIdNumber":1,
          "personnel.assignment.orgId.parentId.orgIdNumber" : 1, 
          "personnel.assignment.orgId.parentId.name" : 1
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
  delete data._id;
  if(data.orgIdNumber == personnel.assignment.orgId.orgIdNumber)
  {
    db.ocdper_ass_orgs.save(data);   
  }
});