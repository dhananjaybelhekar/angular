db.txn_chapterspecifications.find({}).forEach(function(data){
  	if((data.code != undefined) && (data.code != null))
	data.codeName= db.mst_refcodevalues.findOne({_id:data.code}).codeValue;
	db.txn_chapterspecifications.save(data);
});
