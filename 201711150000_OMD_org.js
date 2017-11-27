db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
       "directoryId": ObjectId("57189b3e24d8bc65f4123bbf") ,
       "status": { $ne: ObjectId("5763dc21c19ce14186492e46")}
      }
    },

    // Stage 2
    {
      $sort: {
      "orgIdNumber":1
      }
    },

    // Stage 3
    {
      $unwind: "$address"
    },

    // Stage 4
    {
      $match: {
      "address.addressType" : ObjectId("576286d0c19cef300bc720e6")
      }
    },

    // Stage 5
    {
      $project: {
      "orgIdNumber":1,
      "name":1,
      "address.street1" :1,
      "address.street2":1,
      "address.cityName":1,
      "address.stateName":1,
      "address.zip":1,
      "contact.phoneNumbers":1,
      "contact.faxNumbers":1,
      "contact.emails.primary":1,
      "contact.websites":1,
      "contact.social":1,
      "governing":1,
      "activities.freeText":1,
      "attendance.countNumber":1,
      "membership":1,
      "timing":1,
      "entityType":1
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
