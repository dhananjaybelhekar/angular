db.txn_personnels.find({  
  "directoryId" : ObjectId("57189cc224d8bc65f4123bc1"),
  "name.last":
  	{
  	  $nin:[null,""]
  	}
  	}).forEach(function(data){
	  	  if(data.name.last)
  		data.name.last = data.name.last.trim();
  		db.txn_personnels.save(data);
  	})