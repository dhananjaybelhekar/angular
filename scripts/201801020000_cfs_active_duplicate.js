db.txn_organizations.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: { "directoryId": ObjectId("57189cc224d8bc65f4123bc1"), 
			  "workflowStatus": ObjectId("57283b4214dde6a43b46a7bb") 
			  }
		},

		// Stage 2
		{
			$group: {
			"_id":"$name",
			"count":{"$sum":1}
			}
		},

		// Stage 3
		{
			$match: {
			count:{"$gt":1}
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
