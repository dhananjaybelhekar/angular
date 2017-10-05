db.txn_organizations.aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: {
       "directoryId": ObjectId("57189cd924d8bc65f4123bc3"),
         "status" : ObjectId("57283b4214dde6a43b46a7bb")
      }
    },

    // Stage 2
    {
      $unwind: "$address"
    },

    // Stage 3
    {
      $match: {
      "address.deleted":{$in:[false,null]}
      }
    },

    // Stage 4
    {
      $project: {
      "status":1,
      "orgIdNumber":1,
      "classificationCode":1,
      "name":1,
      "address":1,
      "parentId":1
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
	if(data.parentId)
	{
	data.parentId = db.txn_organizations.findOne({_id:data.parentId},{"name":1,"orgIdNumber":1,"classificationCode":1});
	}
	if(data.classificationCode)
	{
	  data.classificationCode=db.mst_refcodevalues.findOne({_id:data.classificationCode});
	}
	if(address.addressType)
	{
	    data.address.addressType=db.mst_refcodevalues.findOne({_id:data.address.addressType});
	}
	db.ocd_address.save(data);
});

