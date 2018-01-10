db.txn_organizations.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: { "directoryId": ObjectId("57189cc224d8bc65f4123bc1"), "listingType.listing": ObjectId("577e24b8c19c4090a8aee1fa") }
		},

		// Stage 2
		{
			$unwind: "$personnel"
		},

		// Stage 3
		{
			$lookup: {
			    from: "txn_personnels",
			    localField: "personnel",
			    foreignField: "_id",
			    as: "personnel"
			}
		},

		// Stage 4
		{
			$unwind: "$personnel"
		},

		// Stage 5
		{
			$unwind: "$personnel.officers"
		},

		// Stage 6
		{
			$match: {
			"personnel.officers.listingType" : ObjectId("577e24b8c19c4090a8aee1fa")
			}
		},

		// Stage 7
		{
			$group: {
			_id:"$personnel.officers.OfficerTypeName",
			org:{$addToSet:"$_id"},
			personnel:{$addToSet:"$personnel._id"}
			}
		},
	],

	// Options
	{
		cursor: {
			batchSize: 50
		}
	}

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
