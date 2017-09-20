db.txn_personnels.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
          "directoryId" : ObjectId("57189cd924d8bc65f4123bc3")
      }
    },

    // Stage 2
    {
      $project: { 
          "personType" : 1, 
          "status" : 1, 
          "title" : 1, 
          "name.prefix" : 1, 
          "name.first" : 1, 
          "name.middle" : 1, 
          "name.last" : 1, 
          "name.suffix" : 1, 
          "religiousOrderInitials" : 1, 
          "retired" : 1, 
          "very" : 1, 
          "homeDiocese" : 1, 
          "homeNation" : 1, 
          "diedFlag" : 1, 
          "died.day" : 1, 
          "died.month" : 1, 
          "died.year" : 1, 
          "ordination.ordination_day" : 1, 
          "ordination.ordination_month" : 1, 
          "ordination.ordination_year" : 1, 
          "active" : 1, 
          "deleted" : 1, 
          "PeopleIdNumber" : 1, 
          "orgId" : 1
      }
    },

    // Stage 3
    {
      $group: { 
          "_id" : {
      		sameData:{
      		        "personType" : "$personType", 
              "status" : "$status", 
              "title" : "$title", 
              "nameprefix" : "$name.prefix", 
              "namefirst" : "$name.first", 
              "namemiddle" : "$name.middle", 
              "namelast" : "$name.last", 
              "namesuffix" : "$name.suffix", 
              "religiousOrderInitials" : "$religiousOrderInitials", 
              "retired" : "$retired", 
              "very" : "$very", 
              "homeDiocese" : "$homeDiocese", 
              "homeNation" : "$homeNation", 
              "diedFlag" : "$diedFlag", 
              "diedday" : "$died.day", 
              "diedmonth" : "$died.month", 
              "diedyear" : "$died.year", 
              "ordinationordination_day" : "$ordination.ordination_day", 
              "ordinationordination_month" : "$ordination.ordination_month", 
              "ordinationordination_year" : "$ordination.ordination_year", 
              "active" : "$active", 
              "deleted" : "$deleted", 
              "orgId" : "$orgId"
              }
          }, 
          "PeopleIdNumber" : {
              "$push" : "$PeopleIdNumber"
          }, 
          "count" : {
              "$sum" : 1
          }
      }
    },

    // Stage 4
    {
      $match: { 
          "count" : {
              "$gte" : 2
          }
      }
    },

    // Stage 5
    {
      $sort: { 
          "count" : -1
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
