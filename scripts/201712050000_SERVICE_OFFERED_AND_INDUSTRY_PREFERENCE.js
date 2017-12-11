db.txn_chapterspecifications.find({ "listingName": "Lease Companies", "codeName": "Other", "specificationType": { $in: ['SERVICE OFFERED','INDUSTRY PREFERENCE'] } }).forEach(function(data){
data.rank = "5001";
db.txn_chapterspecifications.save(data);
})