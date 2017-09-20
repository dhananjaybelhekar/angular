db.txn_organizations.find({"classificationCode" : ObjectId("57726c33c19c305dc5b1b36d"),"directoryId": ObjectId("57189cd924d8bc65f4123bc3") }).forEach(function(data){
	var root = db.txn_organizations.findOne({_id:data.root});
	if(root.address)
	for(var i=0;i<root.address.length;i++)
	{
	  if(root.address[i].considerThisAddress)
	  {
	    data.rootStateAbbreviation=root.address[i].stateAbbreviation;
	  }
	}
	db.txn_organizations.save(data);
})