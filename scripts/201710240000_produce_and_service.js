db.products_services.find({
    "directoryName": "OCD",
    "companyName": {
        $in: [
/Albl Oberammergau/i,
/American Bible Society/i,
/Aquinas & More/i,
/Aquinas Institute of Theology/i,
/Art Studio Slabbinck/i,
/Associated Crafts/i,
/Augustine Institute/i,
/Baker Liturgical Art/i,
/Bellarmine Retreat/i,
/Best Catholic Pilgrimages/i,
/Black Madonna/i,
/Botti Studio/i,
/Bridget Williams Lighting Design/i,
/Canning Liturgical Arts/i,
/Catholic Travel Centre/i,
/CCS/i,
/Charity Mobile/i,
/Christoph Paccard Bell Foundry/i,
/Church Budget /i,
/Churchproducts.com/i,
/CM Almy/i,
/Coming Home Network/i,
/Conrad Schmitt/i,
/Epiphany Studios/i,
/EvergreeneArchitectural Arts/i,
/Faith Catholic/i,
/Food for the Poor/i,
/Franck & Lohsen/i,
/Franz Mayer/i,
/Gaspard, Inc./i,
/Global Bronze/i,
/Guidance in Giving/i,
/Haden Institute/i,
/Hiemer & Co/i,
/Holy Cross Family Ministries/i,
/Human Life International/i,
/Inspired Artisans/i,
/Knights of Columbus/i,
/Knights of Columbus Asset Advisors/i,
/Lifetouch Church Directories/i,
/Mary & Joseph Retreat Center/i,
/Master Liturgical Design/i,
/Mercy Center/i,
/National Catholic Reporter/i,
/Nawas International Travel/i,
/OCP Main Listing/i,
/Rambusch/i,
/Regina Tours/i,
/Renzetti-Magnarelli Clergy Apparel/i,
/Rohfl/i,
/Rohlf/i,
/Royal Palm Academy/i,
/Rugo Stone/i,
/Ruotolo Associates/i,
/Sacred Spaces/i,
/Sacred Spaces /i,
/ST PAULS Publishing/i,
/The Christophers/i,
/The Leo House/i,
/The Verdin Co./i,
/Varco Pruden Buildings/i,
/W & E Baum/i,
/Willet Hauser/i,
/Cathedral Candle/i,
/Christian Bros Investment Services/i,
/ChurchWindowFilm.com/i,
/ICS\/Institutional Commodities/i,
/Seton Hall University c\/o Furman Roth/i,
        ]
    }
}).sort({companyName:1}).map(function(zzz){ return zzz.companyName })



//db.products_services.find({"directoryName": "OCD"}).forEach(function(data){
//	data.endDate = ISODate("2010-12-31T09:30:00.000+0000");
//	db.products_services.save(data);
//});

//var data = var data = [ObjectId("57bd8f03c19c1584dd31b82a"), ObjectId("57bd8f03c19c1584dd31b7dc"), ObjectId("57bd8f04c19c1584dd31b83e"), ObjectId("57bd8f03c19c1584dd31b7fd"), ObjectId("57bd8f03c19c1584dd31b7ce"), ObjectId("57bd8f03c19c1584dd31b7ab"), ObjectId("57bd8f03c19c1584dd31b7c1"), ObjectId("57bd8f03c19c1584dd31b7f3"), ObjectId("57bd8f03c19c1584dd31b836"), ObjectId("57bd8f03c19c1584dd31b7cb"), ObjectId("57bd8f03c19c1584dd31b7ff"), ObjectId("57bd8f03c19c1584dd31b7e1"), ObjectId("57bd8f03c19c1584dd31b80d"), ObjectId("57bd8f03c19c1584dd31b818"), ObjectId("57bd8f03c19c1584dd31b815"), ObjectId("57bd8f03c19c1584dd31b7aa"), ObjectId("57bd8f03c19c1584dd31b80b"), ObjectId("57bd8f03c19c1584dd31b7a9"), ObjectId("57bd8f03c19c1584dd31b7d6"), ObjectId("57bd8f03c19c1584dd31b7d9"), ObjectId("57bd8f03c19c1584dd31b82e"), ObjectId("57bd8f03c19c1584dd31b79d"), ObjectId("57bd8f03c19c1584dd31b79f"), ObjectId("57bd8f03c19c1584dd31b7da"), ObjectId("57bd8f03c19c1584dd31b7a1"), ObjectId("57bd8f03c19c1584dd31b826"), ObjectId("57bd8f03c19c1584dd31b819"), ObjectId("57bd8f03c19c1584dd31b7df"), ObjectId("57bd8f03c19c1584dd31b7b3"), ObjectId("57bd8f03c19c1584dd31b83a"), ObjectId("57bd8f03c19c1584dd31b7b9"), ObjectId("57bd8f03c19c1584dd31b7bb"), ObjectId("57bd8f03c19c1584dd31b830"), ObjectId("57bd8f03c19c1584dd31b794"), ObjectId("57bd8f03c19c1584dd31b7b4"), ObjectId("57bd8f03c19c1584dd31b7b5"), ObjectId("57bd8f03c19c1584dd31b7d0"), ObjectId("57bd8f03c19c1584dd31b7e8"), ObjectId("57bd8f03c19c1584dd31b833"), ObjectId("57bd8f04c19c1584dd31b841"), ObjectId("57bd8f03c19c1584dd31b7a0"), ObjectId("57bd8f03c19c1584dd31b7dd"), ObjectId("57bd8f03c19c1584dd31b832"), ObjectId("57bd8f03c19c1584dd31b801"), ObjectId("57bd8f03c19c1584dd31b824"), ObjectId("57bd8f03c19c1584dd31b7f6"), ObjectId("57bd8f03c19c1584dd31b7b7"), ObjectId("57bd8f03c19c1584dd31b7bc"), ObjectId("57bd8f03c19c1584dd31b7cf"), ObjectId("57bd8f03c19c1584dd31b834"), ObjectId("57bd8f03c19c1584dd31b816"), ObjectId("57bd8f03c19c1584dd31b798"), ObjectId("57bd8f03c19c1584dd31b790"), ObjectId("57bd8f03c19c1584dd31b81e"), ObjectId("57bd8f03c19c1584dd31b81c"), ObjectId("57bd8f03c19c1584dd31b81d"), ObjectId("57bd8f03c19c1584dd31b835"), ObjectId("57bd8f03c19c1584dd31b82c"), ObjectId("57bd8f03c19c1584dd31b7c2"), ObjectId("57bd8f03c19c1584dd31b804"), ObjectId("57bd8f03c19c1584dd31b79a"), ObjectId("57bd8f03c19c1584dd31b820"), ObjectId("57bd8f03c19c1584dd31b821"), ObjectId("57bd8f03c19c1584dd31b80c"), ObjectId("57bd8f03c19c1584dd31b828"), ObjectId("57bd8f03c19c1584dd31b838"), ObjectId("57bd8f03c19c1584dd31b7f1"),ObjectId("57bd8f03c19c1584dd31b806") ];
//
//data.forEach(function(data){ 
//	var obj = db.products_services.findOne({_id:data})
//	obj.startDate  =ISODate("2012-05-24T09:30:00.000+0000");
//    obj.endDate = ISODate("2018-12-31T09:30:00.000+0000");
//    db.products_services.save(obj);
//});