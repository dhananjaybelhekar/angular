db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { 
                "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
                "active" : true, 
                "deleted" : false, 
                "classificationCode" : ObjectId("57726c33c19c305dc5b1b343")
            }
    },

    // Stage 2
    {
      $unwind: "$address"
    },

    // Stage 3
    {
      $match: {
       "address.considerThisAddress" : true
      }
    },

    // Stage 4
    {
      $group: { 
          "_id" : "$dioProvinceName", 
          "org" : {
              "$push" : {
                  "stateAbbreviation" : "$address.stateAbbreviation", 
                   "name" : "$name", 
                  "personnel" : "$personnel"
              }
          }
      	}
    }

  ]

  // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

);

{ "directoryId": ObjectId("57189cd924d8bc65f4123bc3"),
personType:{$in:[ObjectId("57727ea2c19c6afbbd45e045"),ObjectId("57727ea2c19c6afbbd45e047"),ObjectId("57727ea2c19c6afbbd45e048"),ObjectId("57727ea2c19c6afbbd45e04c")]}
}

Cardinals				57727ea2c19c6afbbd45e045
Archbishops, 			57727ea2c19c6afbbd45e047
Bishops, 				57727ea2c19c6afbbd45e048
Archabbots 				
Abbots					57727ea2c19c6afbbd45e04c
United States



        console.log("DHANANJAYDHANANJAYDHANANJAYDHANANJAYDHANANJAYDHANANJAYDHANANJAYDHANANJAYDHANANJAY");
        console.log(JSON.stringify(query,null,4));
        console.log("BELHEKARBELHEKARBELHEKARBELHEKARBELHEKARBELHEKARBELHEKARBELHEKARBELHEKARBELHEKAR");
