db.new_rep1_3s.drop();
db.txn_organizations.find({
	"directoryId": ObjectId("57189cd924d8bc65f4123bc3"),
    "classificationCode": ObjectId("57726c33c19c305dc5b1b350"),
    "status": ObjectId("57283b4214dde6a43b46a7bb"),
    "parishShrine.parishStatus": {
        $in: [
            ObjectId('57727e25c19cdc7a5c954cec'),
            ObjectId('57727e26c19cdc7a5c954ced'),
            ObjectId('57727e26c19cdc7a5c954cee'),
            ObjectId('57727e26c19cdc7a5c954cf0')
        ]
    },
    "parishShrine.parishStatusName":  { $exists: true },
    "name": { $exists: true },
    "parentName": { $nin: [/archive/i,/Records/i] },
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
  db.new_rep1_3s.save(data);
});