db.products_services.find({}).forEach(function(data){
  	if(data.companyName != undefined)
		data.name = data.companyName.replace(/[^\w\s]/gi, ' ').trim();
	if(data.CompanyName != undefined)
		data.name = data.CompanyName.replace(/[^\w\s]/gi, ' ').trim();
	db.products_services.save(data);
});