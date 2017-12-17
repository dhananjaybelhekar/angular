db.products_services.find({}).forEach(function(data){
  	if(data.companyName != undefined)
		data.name = data.companyName.replace(/<(?:.|\n)*?>/gm, '').replace(/[^\w\s]/gi, ' ').replace(/  +/g, ' ').replace(/<(?:.|\n)*?>/gm, '').trim();
	if(data.CompanyName != undefined){
	  data.companyName = data.CompanyName;
	  delete data.CompanyName;
	  data.name = data.companyName.replace(/<(?:.|\n)*?>/gm, '').replace(/[^\w\s]/gi, ' ').replace(/  +/g, ' ').replace(/<(?:.|\n)*?>/gm, '').trim();
	}
	if(data.companyDescription != undefined)
	  data.companyDescriptionSearch = data.companyDescription.replace(/<(?:.|\n)*?>/gm, '').replace(/[^\w\s]/gi, ' ').replace(/  +/g, ' ').replace(/<(?:.|\n)*?>/gm, '').trim();
	db.products_services.save(data);
});