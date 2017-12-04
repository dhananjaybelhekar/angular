var arr = {

  1:{
    
    "pdfTitle": "Chapter One/ U.S. Venture Capital Lenders",
    "pdfDescription": "This chapter catalogs firms that are seeking investment in high-potential, small companies within a broad spectrum of industries. This chapter concludes with an industry preference index, a financing preference index, a venture capital services index, and geographic preference index."
  },
  2:{
    "pdfTitle": "Chapter Two/ Major Private Lenders",
    "pdfDescription": "This chapter contains listings of private institutional lenders and concludes with an industry preference index."
  },
  3:{
    "pdfTitle": "Chapter Three/ Commercial Finance and Factoring",
    "pdfDescription": "This is a listing of firms that supply commercial finance and factoring services on a nationwide basis. This chapter concludes with a commercial finance services index."
  },
  4:{
    "pdfTitle": "Chapter Four/ Leasing Companies",
    "pdfDescription": "The following firms offer leasing services to a variety of companies that prefer not to purchase their own equipment. This chapter concludes with an industry preference index."
  },
  5:{
    "pdfTitle": "Chapter Five/ Who’s Who at Commercial Banks",
    "pdfDescription": "This chapter is comprised of major U.S. banks in terms of deposits."
  },
  6:{
    "pdfTitle": "Chapter Six/ U.S. Based Foreign Banks",
    "pdfDescription": "This chapter contains entries for foreign banks that have established one or more offices (branch, agency, representative office or Article 12 office) in the U.S."
  },
  7:{
    "pdfTitle": "Chapter Seven/ Who’s Who in Investment Banking",
    "pdfDescription": "This chapter includes entries for investment banking firms and concludes with a geographic preference index."
  },
  8:{
    "pdfTitle": "Chapter Eight/ Foreign Investment Banks in the U.S.",
    "pdfDescription": "This is a listing of foreign investment banking firms which have at least one branch office in the U.S. All information for this chapter has been provided by the firms’ American headquarters."
  },
  9:{
    "pdfTitle": "Chapter Nine/ Business Intermediaries",
    "pdfDescription": "Buyers and sellers of businesses often find that the use of an independent business broker provides a more personalized and confidential means of growth or divestiture. Companies specifically seeking acquisitions find the problem of locating attractive situations a frustrating obstacle. Independent merger and acquisition intermediaries are an important source of leads for any serious buyer or seller. This chapter provides a unique listing of experienced independent merger and acquisition intermediaries who have indicated their willingness to maintain confidentiality and to be contacted without referral. This chapter concludes with an industry preference index."
  },
  10:{
    "pdfTitle": "Chapter Ten/ Pension Managers",
    "pdfDescription": "This chapter contains entries for pension management firms and concludes with an investment services index."
  },
  11:{
    "pdfTitle": "Chapter Eleven/ Master Trusts",
    "pdfDescription": "The U.S. banks listed in this chapter offer master trust services to a variety of corporate clients. This chapter concludes with a master trust services index."
  },
  12:{
    "pdfTitle": "Chapter Twelve/ Leading Cash Managers",
    "pdfDescription": "This chapter is a listing of U.S. banks and select data corporations which offer diversified, sophisticated cash management services to a variety of corporate clients. This chapter concludes with a cash management services index."
  },
  13:{
    "pdfTitle": "Chapter Thirteen/ Business Insurance Brokers",
    "pdfDescription": "Listed in this chapter are prominent business insurance brokers."
  },
  14:{
    "pdfTitle": "Chapter Fourteen/ Corporate Real Estate Services",
    "pdfDescription": "This is a list of leading firms which offer various specialized real estate consulting services to corporations. This chapter concludes with a consulting services index."
  },
  15:{
    "pdfTitle": "Chapter Fifteen/ Contact Directory of Securities Analysts",
    "pdfDescription": "This chapter lists 53 industry groups and those security analysts who cover each of them."
  },
  16:{
    "pdfTitle": "Chapter Sixteen/ CPA Accounting and Audit Firms",
    "pdfDescription": "This chapter lists major accounting firms nationwide and concludes with a services index and an industry specialization index."
  },
  17:{
    "pdfTitle": "Chapter Seventeen/ International Venture Capital",
    "pdfDescription": "This chapter catalogs firms located outside the U.S. actively seeking venture investment opportunities within a broad spectrum of industries in the United States. This chapter concludes with an industry preference index, a financing preference index, a venture capital services index, and a geographical preference index."
  },
  18:{
    "pdfTitle": "Chapter Eighteen/ Merchant Banking",
    "pdfDescription": "This chapter is a listing of prominent merchant banking firms in the United States. This chapter concludes with an industry preference index, a financing preference index, a merchant banking services index, and a geographical preference index."
  }
};


db.mst_refcodevalues.find({ "codeTypeId": ObjectId("572846d093475e9e85c93844"), "directoryId": ObjectId("57189cc224d8bc65f4123bc1") }).forEach(function(data){
	 data.XML = arr[data.description];
	 db.mst_refcodevalues.save(data);
});