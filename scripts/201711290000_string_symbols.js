db.products_services.find({}).forEach(function(data){
  	if(data.companyName != undefined)
		data.name = data.companyName.replace(/[^\w\s]/gi, ' ').replace(/  /g,'').trim();
	if(data.CompanyName != undefined){
	  data.companyName = data.CompanyName;
	  delete data.CompanyName;
	  data.name = data.companyName.replace(/[^\w\s]/gi, ' ').replace(/  /g,'').trim();
	}
	db.products_services.save(data);
});