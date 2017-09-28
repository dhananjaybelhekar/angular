db.txn_organizations.find({
    "directoryId": ObjectId("57189cd924d8bc65f4123bc3"),
    "classificationCode": ObjectId("57726c33c19c305dc5b1b34d"),
    "status": ObjectId("57283b4214dde6a43b46a7bb"),
    "name": {
        $nin: [
            /Office/i,
            /Parish Office/i,
            /Office Address/i,
            /Prison/i,
            /Penitentiary/i,
            /Jail/i,
            /Detention/i,
            /Correctional/i,
            /Worship Site/i,
            /Churches/i,
            /In Res/i,
            /Parish Center/i,
            /Pastoral Center/i,
            /Administration/i,
        ]
    },
    "notes.note":{$nin:[/closed/i,/consol/i,]},
    "parentName":{$nin:[/archive/i,/records/i,]},
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
  db.new_repTwos.save(data);
});
