db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
      "directoryId" : ObjectId("57189cc224d8bc65f4123bc1"), 
      "deletedFlag" : false, 
      "active" : true, 
      "deleted" : false, 
      "status" : ObjectId("57283b4214dde6a43b46a7bb")
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
       "personnel.activeFlag" : true, 
          "personnel.deletedFlag" : false, 
          "personnel.active" : true, 
       //   "personnel.officers.OfficerTypeName":"Miscellaneous"
      }
    },

    // Stage 6
    {
      $unwind: "$personnel.officers"
    },

    // Stage 7
    {
      $group: {
      _id:{listingTypeName:"$personnel.officers.listingTypeName"},
      	"OfficerTypeNameArr":{$addToSet:"$personnel.officers.OfficerTypeName"},
      	"OfficerTypeName":{$push:{
      	  "OfficerTypeName":"$personnel.officers.OfficerTypeName",
      	  "orgId":"$_id",
      	}},
      	//"orgId":{$addToSet:"$_id"},
      //"$personnel.officers.OfficerTypeName":{$addToSet:"$org_id"}
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
