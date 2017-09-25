function show(qr,broot)
{
		db.txn_organizations.find(qr,{"ocdContact.contactDetails":1,"ocdContact.contactTypeName":1,"address.street1":1,"address.street2":1,"address.zip":1,"parentId":1,"notes":1,"name":1,"classificationCodeName":1,"sequenceNo":1,"header":1,"orgIdNumber":1,"personnel":1}).sort({name:1}).forEach(function(data){
		if(data.personnel.length > 0){
			for(var i=0;i<data.personnel.length;i++)
			{
			 data.personnel[i]=db.txn_personnels.findOne({_id:data.personnel[i]},{"title":1,"name.first":1,"name.last":1,"name.middle":1,"religiousOrderInitials":1,"notes.note":1,"notes.HeaderItalic":1,"notes.bold":1});
			 if(data.personnel[i].notes != undefined)
			 if(data.personnel[i].notes.length > 0)
			 {
			 data.noteInfo={"note":data.personnel[i].notes};
			 delete data.personnel[i].notes;
			 }
			}
			data.personnelInfo={"personnel":data.personnel};
			delete data.personnel;
		}	
			if((data.ocdContact != undefined) && (data.ocdContact.length > 0))
			{
			data.ocdContactInfo={ocdContact:data.ocdContact};
			delete data.ocdContact;
			}
			if((data.address != undefined) && (data.address.length	> 0))
			{
			data.addressInfo={address:data.address};
			delete data.address;
			}
			if(data.classificationCodeName=="Header"){
			data.header.HeaderName=data.name;
			}else{
				data.OrganizationName=data.name	
			}
			if((data.notes != undefined) && (data.notes.length > 0))
			{
			data.notesInfo={notes:data.notes};
				delete data.notes;
			}
			delete data.name;
			//delete data.classificationCodeName;
			db.gre_xmls.save(data);
			show({ "parentId": data._id,"directoryId":ObjectId("57189cd924d8bc65f4123bc3")},broot)
		});
}
db.gre_xmls.drop();
db.txn_organizations.find({ "parentId" : ObjectId("578db834c19cc73dbcbef96b"),"directoryId":ObjectId("57189cd924d8bc65f4123bc3")},{"name":1,"notes":1,"classificationCodeName":1,"sequenceNo":1,"header":1,"orgIdNumber":1,"parentId":1,"personnel":1}).forEach(function(root){
	show({ "parentId": root._id,"directoryId":ObjectId("57189cd924d8bc65f4123bc3")},root._id)
})
printjson(db.gre_xmls.find({}).toArray());
//db.xml.drop();
//mongo 10.0.1.131/tw-new-migrated nestedTree.js > xmldata.json