db.mst_refcodevalues.insertMany([{ 
    "codeTypeId" : ObjectId("5788874a90e2ca7b062add67"), 
    "parentId" : ObjectId("57bd4e14c19c2d37eb85de26"), 
    "codeValue" : "Insurance", 
    "description" : "", 
    "active" : true, 
    "deleted" : false, 
    "catId" : NumberInt(6727), 
    "created" : {
        "by" : null, 
        "at" : ISODate("2016-08-24T09:59:53.600+0000")
    }, 
    "belongsTo" : [
        {
            "identifier" : "PRODUCT SUB CATEGORY", 
            "directory" : ObjectId("57189cd924d8bc65f4123bc3")
        }
    ]
},
{ 
    "codeTypeId" : ObjectId("5788874a90e2ca7b062add67"), 
    "parentId" : ObjectId("57bd4e14c19c2d37eb85de26"), 
    "codeValue" : "Retirement Resources", 
    "description" : "", 
    "active" : true, 
    "deleted" : false, 
    "catId" : NumberInt(6727), 
    "created" : {
        "by" : null, 
        "at" : ISODate("2016-08-24T09:59:53.600+0000")
    }, 
    "belongsTo" : [
        {
            "identifier" : "PRODUCT SUB CATEGORY", 
            "directory" : ObjectId("57189cd924d8bc65f4123bc3")
        }
    ]
}]);

db.products_services.insertMany(
[{ 
    "_id" : ObjectId("5a2a25cb60ce8bfe80ae7d7e"), 
    "org_id" : NumberInt(300006574), 
    "directoryName" : "OCD", 
    "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
    "adsTypeId" : ObjectId("57baccd2c19cc75c73b7da9f"), 
    "adsTypeName" : "PREMIUM", 
    "name" : "Christian Brothers Services", 
    "companyName" : "Christian Brothers Services", 
    "companyLocalTitle" : "", 
    "sortName" : "", 
    "logoCaption" : "", 
    "companyListLogo" : "americanbiblelogo_sm.jpg", 
    "companyDetailsLogo" : "americanbiblelogo_lg.jpg", 
    "adsEditId" : NumberInt(0), 
    "userId" : NumberInt(0), 
    "cost" : 60.0, 
    "pay" : 0.0, 
    "laststep" : NumberInt(0), 
    "checked_out" : NumberInt(0), 
    "published" : NumberInt(1), 
    "changed" : NumberInt(0), 
    "approve_date" : null, 
    "hits" : NumberInt(0), 
    "logoHits" : NumberInt(0), 
    "startDate" : ISODate("2017-01-01T09:30:00.000+0000"), 
    "endDate" : ISODate("2019-01-01T09:30:00.000+0000"), 
    "telephone" : "800-807-0100", 
    "companyFreePhone" : "", 
    "fax" : "", 
    "companyFreeFax" : "", 
    "companyEmail" : "Info@CBservices.org;Michael.quirk@CBservices.org;Matt.Robbie@CBservices.org", 
    "companyWebsite" : "www.CBServices.org", 
    "companyTypeHeader" : "Type of Business:", 
    "companyDescription" : "<p style=\"margin: 0px; -webkit-text-stroke-width: 0px; text-align: justify;\"><span style=\"font-size:12.8px\"><span style=\"color:#222222\"><span style=\"font-family:arial, sans-serif\"><span style=\"font-style:normal\"><span style=\"font-variant-ligatures:normal\"><span style=\"font-variant-caps:normal\"><span style=\"font-weight:400\"><span style=\"letter-spacing:normal\"><span style=\"orphans:2\"><span style=\"text-transform:none\"><span style=\"white-space:normal\"><span style=\"widows:2\"><span style=\"word-spacing:0px\"><span style=\"background-color:#ffffff\"><span style=\"text-decoration-style:initial\"><span style=\"text-decoration-color:initial\">Founded in 1960, Christian Brothers Services is a nonprofit, Catholic organization that administers cooperative programs in the areas of health, retirement, property/casualty, technology, Catholic school consulting, and management and financial consulting to church organizations.</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n\n<p style=\"margin: 0px; -webkit-text-stroke-width: 0px; text-align: justify;\"><span style=\"font-size:12.8px\"><span style=\"color:#222222\"><span style=\"font-family:arial, sans-serif\"><span style=\"font-style:normal\"><span style=\"font-variant-ligatures:normal\"><span style=\"font-variant-caps:normal\"><span style=\"font-weight:400\"><span style=\"letter-spacing:normal\"><span style=\"orphans:2\"><span style=\"text-transform:none\"><span style=\"white-space:normal\"><span style=\"widows:2\"><span style=\"word-spacing:0px\"><span style=\"background-color:#ffffff\"><span style=\"text-decoration-style:initial\"><span style=\"text-decoration-color:initial\">Christian Brothers Services exemplifies the Lasallian tradition by understanding the needs of our members, protecting the human and financial resources of institutions and guiding member organizations in finding practical solutions to business needs</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n", 
    "metaDescription" : "", 
    "metaKeyword" : "Bibles, Hymnals, Missalettes", 
    "companyAddress" : {
        "street1" : "1205 Windham Parkway", 
        "street2" : "", 
        "cityId" : ObjectId("57728aa0c19ce86ca8a153b2"), 
        "city" : "Romeoville", 
        "stateId" : ObjectId("576230b9c19c494dcc08cee8"), 
        "stateAbbreviation" : "IL", 
        "state" : "ILLINOIS", 
        "countryId" : ObjectId("5718d7abca75ca39db934831"), 
        "country" : "USA", 
        "zip" : "60446"
    }, 
    "state" : ObjectId("57bc4b7dc19c0169d6e407f6"), 
    "location" : [
        -75.150071, 
        39.950004
    ], 
    "categories" : [
        {
            "ProductCategory" : ObjectId("57bd4e14c19c2d37eb85de26"), 
            "ProductCategoryName" : "Business & Finance", 
            "ProductSubCategory" : ObjectId("57bd7019c19c282e99fd8793"), 
            "ProductSubCategoryName" : "Consultants", 
            "_id" : ObjectId("5a2a27fe1c342f1bb436fc40")
        }, 
        {
            "_id" : ObjectId("5a2fba966434a428f0c4f036"), 
            "ProductSubCategoryName" : "Insurance", 
            "ProductSubCategory" : ObjectId("5a2fb60b610b51a0a3b98c7d"), 
            "ProductCategoryName" : "Business & Finance", 
            "ProductCategory" : ObjectId("57bd4e14c19c2d37eb85de26")
        }, 
        {
            "_id" : ObjectId("5a2fba966434a428f0c4f035"), 
            "ProductSubCategoryName" : "Retirement Resources", 
            "ProductSubCategory" : ObjectId("5a2fb60b610b51a0a3b98c7e"), 
            "ProductCategoryName" : "Business & Finance", 
            "ProductCategory" : ObjectId("57bd4e14c19c2d37eb85de26")
        }
    ], 
    "personnel" : [
        {
            "personId" : NumberInt(30653491), 
            "personnel_id" : NumberInt(0), 
            "adsId" : NumberInt(0), 
            "responseCode" : null, 
            "responseCodeName" : null, 
            "personPrefix" : "", 
            "personName" : "Br. Michael", 
            "personLastName" : "Quirk, FSC", 
            "PersonNameSuffix" : "", 
            "personDesignation" : "President  & CEO", 
            "personEmail" : null, 
            "personPhone" : null, 
            "personFax" : null, 
            "_id" : ObjectId("59f716d128d857039c62dcdd")
        }, 
        {
            "personId" : NumberInt(30653491), 
            "personnel_id" : NumberInt(0), 
            "adsId" : NumberInt(0), 
            "responseCode" : null, 
            "responseCodeName" : null, 
            "personPrefix" : "", 
            "personName" : "Matt", 
            "personLastName" : "Robbie", 
            "PersonNameSuffix" : "", 
            "personDesignation" : "Business Development", 
            "personEmail" : null, 
            "personPhone" : null, 
            "personFax" : null, 
            "_id" : ObjectId("59f716d128d857039c62dcdd")
        }
    ], 
    "stripName" : "American Bible Society", 
    "companyDescriptionSearch" : "p style margin 0px webkit text stroke width 0px text align justify span style font size 12 8px span style color 222222 span style font family arial sans serif span style font style normal span style font variant ligatures normal span style font variant caps normal span style font weight 400 span style letter spacing normal span style orphans 2 span style text transform none span style white space normal span style widows 2 span style word spacing 0px span style background color ffffff span style text decoration style initial span style text decoration color initial Founded in 1960 Christian Brothers Services is a nonprofit Catholic organization that administers cooperative programs in the areas of health retirement property casualty technology Catholic school consulting and management and financial consulting to church organizations span span span span span span span span span span span span span span span span p \n\n p style margin 0px webkit text stroke width 0px text align justify span style font size 12 8px span style color 222222 span style font family arial sans serif span style font style normal span style font variant ligatures normal span style font variant caps normal span style font weight 400 span style letter spacing normal span style orphans 2 span style text transform none span style white space normal span style widows 2 span style word spacing 0px span style background color ffffff span style text decoration style initial span style text decoration color initial Christian Brothers Services exemplifies the Lasallian tradition by understanding the needs of our members protecting the human and financial resources of institutions and guiding member organizations in finding practical solutions to business needs span span span span span span span span span span span span span span span span p"
},{ 
    "_id" : ObjectId("5a2fb6969b8b6a6567c1e904"), 
    "org_id" : NumberInt(300006574), 
    "directoryName" : "OCD", 
    "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
    "adsTypeId" : ObjectId("57baccd2c19cc75c73b7da9f"), 
    "adsTypeName" : "PREMIUM", 
    "name" : "Christian Brothers Serviceszz", 
    "companyName" : "Christian Brothers Services", 
    "companyLocalTitle" : "", 
    "sortName" : "", 
    "logoCaption" : "", 
    "companyListLogo" : "americanbiblelogo_sm.jpg", 
    "companyDetailsLogo" : "americanbiblelogo_lg.jpg", 
    "adsEditId" : NumberInt(0), 
    "userId" : NumberInt(0), 
    "cost" : 60.0, 
    "pay" : 0.0, 
    "laststep" : NumberInt(0), 
    "checked_out" : NumberInt(0), 
    "published" : NumberInt(1), 
    "changed" : NumberInt(0), 
    "approve_date" : null, 
    "hits" : NumberInt(0), 
    "logoHits" : NumberInt(0), 
    "startDate" : ISODate("2017-01-01T09:30:00.000+0000"), 
    "endDate" : ISODate("2019-01-01T09:30:00.000+0000"), 
    "telephone" : "800-807-0100", 
    "companyFreePhone" : "", 
    "fax" : "", 
    "companyFreeFax" : "", 
    "companyEmail" : "Info@CBservices.org;Dawn.Reece@CBservices.org;Michael.Vollmer@CBservices.org;Donna.Bertino@CBservices.org", 
    "companyWebsite" : "www.CBServices.org", 
    "companyTypeHeader" : "Type of Business:", 
    "companyDescription" : "<p style=\"margin: 0px; -webkit-text-stroke-width: 0px; text-align: justify;\"><span style=\"font-size:12.8px\"><span style=\"color:#222222\"><span style=\"font-family:arial, sans-serif\"><span style=\"font-style:normal\"><span style=\"font-variant-ligatures:normal\"><span style=\"font-variant-caps:normal\"><span style=\"font-weight:400\"><span style=\"letter-spacing:normal\"><span style=\"orphans:2\"><span style=\"text-transform:none\"><span style=\"white-space:normal\"><span style=\"widows:2\"><span style=\"word-spacing:0px\"><span style=\"background-color:#ffffff\"><span style=\"text-decoration-style:initial\"><span style=\"text-decoration-color:initial\">Founded in 1960, Christian Brothers Services is a nonprofit, Catholic organization that administers cooperative programs in the areas of health, retirement, property/casualty, technology, Catholic school consulting, and management and financial consulting to church organizations.</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n\n<p style=\"margin: 0px; -webkit-text-stroke-width: 0px; text-align: justify;\"><span style=\"font-size:12.8px\"><span style=\"color:#222222\"><span style=\"font-family:arial, sans-serif\"><span style=\"font-style:normal\"><span style=\"font-variant-ligatures:normal\"><span style=\"font-variant-caps:normal\"><span style=\"font-weight:400\"><span style=\"letter-spacing:normal\"><span style=\"orphans:2\"><span style=\"text-transform:none\"><span style=\"white-space:normal\"><span style=\"widows:2\"><span style=\"word-spacing:0px\"><span style=\"background-color:#ffffff\"><span style=\"text-decoration-style:initial\"><span style=\"text-decoration-color:initial\">Christian Brothers Services exemplifies the Lasallian tradition by understanding the needs of our members, protecting the human and financial resources of institutions and guiding member organizations in finding practical solutions to business needs</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n", 
    "metaDescription" : "", 
    "metaKeyword" : "Bibles, Hymnals, Missalettes", 
    "companyAddress" : {
        "street1" : "1205 Windham Parkway", 
        "street2" : "", 
        "cityId" : ObjectId("57728aa0c19ce86ca8a153b2"), 
        "city" : "Romeoville", 
        "stateId" : ObjectId("576230b9c19c494dcc08cee8"), 
        "stateAbbreviation" : "IL", 
        "state" : "ILLINOIS", 
        "countryId" : ObjectId("5718d7abca75ca39db934831"), 
        "country" : "USA", 
        "zip" : "60446"
    }, 
    "state" : ObjectId("57bc4b7dc19c0169d6e407f6"), 
    "location" : [
        -75.150071, 
        39.950004
    ], 
    "categories" : [
        {
            "ProductCategory" : ObjectId("57bd4e14c19c2d37eb85de26"), 
            "ProductCategoryName" : "Business & Finance", 
            "ProductSubCategory" : ObjectId("5a2fb60b610b51a0a3b98c7d"), 
            "ProductSubCategoryName" : "Insurance", 
            "_id" : ObjectId("5a2fb7526434a428f0c4f033")
        }, 
        {
            "_id" : ObjectId("5a2fbaee6434a428f0c4f03b"), 
            "ProductSubCategoryName" : "Consultants", 
            "ProductSubCategory" : ObjectId("57bd7019c19c282e99fd8793"), 
            "ProductCategoryName" : "Business & Finance", 
            "ProductCategory" : ObjectId("57bd4e14c19c2d37eb85de26")
        }, 
        {
            "_id" : ObjectId("5a2fbaee6434a428f0c4f03a"), 
            "ProductSubCategoryName" : "Retirement Resources", 
            "ProductSubCategory" : ObjectId("5a2fb60b610b51a0a3b98c7e"), 
            "ProductCategoryName" : "Business & Finance", 
            "ProductCategory" : ObjectId("57bd4e14c19c2d37eb85de26")
        }
    ], 
    "personnel" : [
        {
            "_id" : ObjectId("5a2fbaee6434a428f0c4f039"), 
            "personFax" : null, 
            "personPhone" : null, 
            "personEmail" : null, 
            "personDesignation" : "Manager, Health Benefits Services", 
            "PersonNameSuffix" : "", 
            "personLastName" : "Reece", 
            "personName" : "Dawn", 
            "personPrefix" : "", 
            "responseCodeName" : null, 
            "responseCode" : null, 
            "adsId" : NumberInt(0), 
            "personnel_id" : NumberInt(0), 
            "personId" : NumberInt(30653491)
        }, 
        {
            "_id" : ObjectId("5a2fbaee6434a428f0c4f038"), 
            "personFax" : null, 
            "personPhone" : null, 
            "personEmail" : null, 
            "personDesignation" : "Risk Manager, Risk Management Services", 
            "PersonNameSuffix" : "", 
            "personLastName" : "Vollmer", 
            "personName" : "Michael", 
            "personPrefix" : "", 
            "responseCodeName" : null, 
            "responseCode" : null, 
            "adsId" : NumberInt(0), 
            "personnel_id" : NumberInt(0), 
            "personId" : NumberInt(30653491)
        }, 
        {
            "_id" : ObjectId("5a2fbaee6434a428f0c4f037"), 
            "personFax" : null, 
            "personPhone" : null, 
            "personEmail" : null, 
            "personDesignation" : "Director of Underwriting, Risk Management Services", 
            "PersonNameSuffix" : "", 
            "personLastName" : "Bertino", 
            "personName" : "Donna", 
            "personPrefix" : "", 
            "responseCodeName" : null, 
            "responseCode" : null, 
            "adsId" : NumberInt(0), 
            "personnel_id" : NumberInt(0), 
            "personId" : NumberInt(30653491)
        }
    ], 
    "stripName" : "American Bible Society", 
    "companyDescriptionSearch" : "p style margin 0px webkit text stroke width 0px text align justify span style font size 12 8px span style color 222222 span style font family arial sans serif span style font style normal span style font variant ligatures normal span style font variant caps normal span style font weight 400 span style letter spacing normal span style orphans 2 span style text transform none span style white space normal span style widows 2 span style word spacing 0px span style background color ffffff span style text decoration style initial span style text decoration color initial Founded in 1960 Christian Brothers Services is a nonprofit Catholic organization that administers cooperative programs in the areas of health retirement property casualty technology Catholic school consulting and management and financial consulting to church organizations span span span span span span span span span span span span span span span span p \n\n p style margin 0px webkit text stroke width 0px text align justify span style font size 12 8px span style color 222222 span style font family arial sans serif span style font style normal span style font variant ligatures normal span style font variant caps normal span style font weight 400 span style letter spacing normal span style orphans 2 span style text transform none span style white space normal span style widows 2 span style word spacing 0px span style background color ffffff span style text decoration style initial span style text decoration color initial Christian Brothers Services exemplifies the Lasallian tradition by understanding the needs of our members protecting the human and financial resources of institutions and guiding member organizations in finding practical solutions to business needs span span span span span span span span span span span span span span span span p"
},
{ 
    "_id" : ObjectId("5a2fb6b69b8b6a6567c1e906"), 
    "org_id" : NumberInt(300006574), 
    "directoryName" : "OCD", 
    "directoryId" : ObjectId("57189cd924d8bc65f4123bc3"), 
    "adsTypeId" : ObjectId("57baccd2c19cc75c73b7da9f"), 
    "adsTypeName" : "PREMIUM", 
    "name" : "Christian Brothers Services", 
    "companyName" : "Christian Brothers Services", 
    "companyLocalTitle" : "", 
    "sortName" : "", 
    "logoCaption" : "", 
    "companyListLogo" : "americanbiblelogo_sm.jpg", 
    "companyDetailsLogo" : "americanbiblelogo_lg.jpg", 
    "adsEditId" : NumberInt(0), 
    "userId" : NumberInt(0), 
    "cost" : 60.0, 
    "pay" : 0.0, 
    "laststep" : NumberInt(0), 
    "checked_out" : NumberInt(0), 
    "published" : NumberInt(1), 
    "changed" : NumberInt(0), 
    "approve_date" : null, 
    "hits" : NumberInt(0), 
    "logoHits" : NumberInt(0), 
    "startDate" : ISODate("2017-01-01T09:30:00.000+0000"), 
    "endDate" : ISODate("2019-01-01T09:30:00.000+0000"), 
    "telephone" : "800-807-0100", 
    "companyFreePhone" : "", 
    "fax" : "", 
    "companyFreeFax" : "", 
    "companyEmail" : "Info@CBservices.org;Jim.Ceplecha@CBservices.org", 
    "companyWebsite" : "www.CBServices.org", 
    "companyTypeHeader" : "Type of Business:", 
    "companyDescription" : "<p style=\"margin: 0px; -webkit-text-stroke-width: 0px; text-align: justify;\"><span style=\"font-size:12.8px\"><span style=\"color:#222222\"><span style=\"font-family:arial, sans-serif\"><span style=\"font-style:normal\"><span style=\"font-variant-ligatures:normal\"><span style=\"font-variant-caps:normal\"><span style=\"font-weight:400\"><span style=\"letter-spacing:normal\"><span style=\"orphans:2\"><span style=\"text-transform:none\"><span style=\"white-space:normal\"><span style=\"widows:2\"><span style=\"word-spacing:0px\"><span style=\"background-color:#ffffff\"><span style=\"text-decoration-style:initial\"><span style=\"text-decoration-color:initial\">Founded in 1960, Christian Brothers Services is a nonprofit, Catholic organization that administers cooperative programs in the areas of health, retirement, property/casualty, technology, Catholic school consulting, and management and financial consulting to church organizations.</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n\n<p style=\"margin: 0px; -webkit-text-stroke-width: 0px; text-align: justify;\"><span style=\"font-size:12.8px\"><span style=\"color:#222222\"><span style=\"font-family:arial, sans-serif\"><span style=\"font-style:normal\"><span style=\"font-variant-ligatures:normal\"><span style=\"font-variant-caps:normal\"><span style=\"font-weight:400\"><span style=\"letter-spacing:normal\"><span style=\"orphans:2\"><span style=\"text-transform:none\"><span style=\"white-space:normal\"><span style=\"widows:2\"><span style=\"word-spacing:0px\"><span style=\"background-color:#ffffff\"><span style=\"text-decoration-style:initial\"><span style=\"text-decoration-color:initial\">Christian Brothers Services exemplifies the Lasallian tradition by understanding the needs of our members, protecting the human and financial resources of institutions and guiding member organizations in finding practical solutions to business needs</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n", 
    "metaDescription" : "", 
    "metaKeyword" : "Bibles, Hymnals, Missalettes", 
    "companyAddress" : {
        "street1" : "1205 Windham Parkway", 
        "street2" : "", 
        "cityId" : ObjectId("57728aa0c19ce86ca8a153b2"), 
        "city" : "Romeoville", 
        "stateId" : ObjectId("576230b9c19c494dcc08cee8"), 
        "stateAbbreviation" : "IL", 
        "state" : "ILLINOIS", 
        "countryId" : ObjectId("5718d7abca75ca39db934831"), 
        "country" : "USA", 
        "zip" : "60446"
    }, 
    "state" : ObjectId("57bc4b7dc19c0169d6e407f6"), 
    "location" : [
        -75.150071, 
        39.950004
    ], 
    "categories" : [
        {
            "_id" : ObjectId("5a2fb9346434a428f0c4f034"), 
            "ProductSubCategoryName" : "Retirement Resources", 
            "ProductSubCategory" : ObjectId("5a2fb60b610b51a0a3b98c7e"), 
            "ProductCategoryName" : "Business & Finance", 
            "ProductCategory" : ObjectId("57bd4e14c19c2d37eb85de26")
        }, 
        {
            "_id" : ObjectId("5a2fbc406434a428f0c4f03d"), 
            "ProductSubCategoryName" : "Consultants", 
            "ProductSubCategory" : ObjectId("57bd7019c19c282e99fd8793"), 
            "ProductCategoryName" : "Business & Finance", 
            "ProductCategory" : ObjectId("57bd4e14c19c2d37eb85de26")
        }, 
        {
            "_id" : ObjectId("5a2fbc406434a428f0c4f03c"), 
            "ProductSubCategoryName" : "Insurance", 
            "ProductSubCategory" : ObjectId("5a2fb60b610b51a0a3b98c7d"), 
            "ProductCategoryName" : "Business & Finance", 
            "ProductCategory" : ObjectId("57bd4e14c19c2d37eb85de26")
        }
    ], 
    "personnel" : [
        {
            "personId" : NumberInt(30653491), 
            "personnel_id" : NumberInt(0), 
            "adsId" : NumberInt(0), 
            "responseCode" : null, 
            "responseCodeName" : null, 
            "personPrefix" : "", 
            "personName" : "Jim", 
            "personLastName" : "Ceplecha", 
            "PersonNameSuffix" : "", 
            "personDesignation" : "Managing Director, Retirement Planning Services", 
            "personEmail" : null, 
            "personPhone" : null, 
            "personFax" : null, 
            "_id" : ObjectId("59f716d128d857039c62dcdd")
        }
    ], 
    "stripName" : "American Bible Society", 
    "companyDescriptionSearch" : "p style margin 0px webkit text stroke width 0px text align justify span style font size 12 8px span style color 222222 span style font family arial sans serif span style font style normal span style font variant ligatures normal span style font variant caps normal span style font weight 400 span style letter spacing normal span style orphans 2 span style text transform none span style white space normal span style widows 2 span style word spacing 0px span style background color ffffff span style text decoration style initial span style text decoration color initial Founded in 1960 Christian Brothers Services is a nonprofit Catholic organization that administers cooperative programs in the areas of health retirement property casualty technology Catholic school consulting and management and financial consulting to church organizations span span span span span span span span span span span span span span span span p \n\n p style margin 0px webkit text stroke width 0px text align justify span style font size 12 8px span style color 222222 span style font family arial sans serif span style font style normal span style font variant ligatures normal span style font variant caps normal span style font weight 400 span style letter spacing normal span style orphans 2 span style text transform none span style white space normal span style widows 2 span style word spacing 0px span style background color ffffff span style text decoration style initial span style text decoration color initial Christian Brothers Services exemplifies the Lasallian tradition by understanding the needs of our members protecting the human and financial resources of institutions and guiding member organizations in finding practical solutions to business needs span span span span span span span span span span span span span span span span p"
}]);