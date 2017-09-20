db.txn_organizations.find({
    "directoryId": ObjectId("57189cd924d8bc65f4123bc3"),
    "classificationCode":{
     $in: [
     ObjectId("57726c33c19c305dc5b1b350"),
     ObjectId("57726c33c19c305dc5b1b34d"),
     ObjectId("57726c33c19c305dc5b1b34f"),
     ObjectId("57726c33c19c305dc5b1b352"),
     ObjectId("57726c33c19c305dc5b1b353")
     ]
    },
    "status": ObjectId("57283b4214dde6a43b46a7bb"),
    "name": { $exists: true },
    "notes.note":{$nin:[/closed/i,/consol/i,]},
    "parentName":{$nin:[/archive/i,/records/i]},
    "address.addressType":{ 
            $nin: [
            ObjectId("57726e42c19c3451796ea55f"),
            ObjectId("57726e42c19c3451796ea562")
            ]
        } 
}).forEach(function(data){
  delete data._id;
  if(data.parentId)
	data.parentId = db.txn_organizations.findOne({_id:data.parentId});
  db.new_repThrees.save(data);
});
