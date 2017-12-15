db.txn_organizations.find({ 
   // "_id" : ObjectId("578db77fc19cc73dbcbd1ac5"), 
  "directoryId": ObjectId("57189cd924d8bc65f4123bc3"), 
  "status": ObjectId("57283b4214dde6a43b46a7bb"), 
	"classificationCode" : {
              "$in" : [
                  ObjectId("57726c33c19c305dc5b1b352"), 
                  ObjectId("57726c33c19c305dc5b1b353")
              ]},
  "address": { $exists: true } 
  }).forEach(function(data){
    	var temp = true;
	data.address.forEach(function(bdata){
	  	if(bdata.addressType.toString() === ObjectId("576286d0c19cef300bc720e5").toString())
	  	{
			temp=false;
		}
		if(bdata.addressType === ObjectId("576286d0c19cef300bc720e6").toString())
		{
			temp=false;
		}
		if(bdata.addressType === ObjectId("57726e42c19c3451796ea561").toString())
		{
			temp=false;
		}
	});

		data.addr2=temp;
	db.txn_organizations.save(data);
})
