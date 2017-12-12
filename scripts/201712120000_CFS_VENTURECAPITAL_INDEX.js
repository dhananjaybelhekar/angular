db.txn_chapterspecifications.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
      "listingName":{$ne:null}
      }
    },

    // Stage 2
    {
      $group: { 
          "_id" : {
              "listingName" : "$listingName", 
              "specificationType" : "$specificationType"
          }, 
          "Org" : {
              "$addToSet" : "$organizationId"
          }
      }
    },

    // Stage 3
    {
      $group: {
      _id:"$_id.listingName",
      data:{$push:{specificationType:"$_id.specificationType","Org":"$Org"}}
      }
    },

    // Stage 4
    {
      $sort: {
      "_id":1
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
