var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var fun = require("./fun1.js");
var fun3 = require("./fun3.js");
mongoose.connect("mongodb://192.168.10.178/OCD_XML", { useMongoClient: true });
mongoose.Promise = global.Promise;
// mongoose.connection.db.dropCollection("TXN_Temp", function(err, result) {

//     console.log("DONE DROP");
// });
//fun.getAll();

////////////////////////////////fun2.js///////////////////////////////////////////////
// var x= [{"id":1,"tag":"Sec","parent":"0","type":"","printType":"","children":[{"id":2,"tag":" ChapterName","parent":1,"type":"","printType":"","children":[{"id":3,"tag":"Org","parent":2,"type":"array","printType":"","collection":"txn_organizations","qr":[{"$match":{"directoryId":{"_eval":"Id","value":"57189cc224d8bc65f4123bc1"},"status":{"_eval":"Id","value":"57283b4214dde6a43b46a7bb"},"workflowStatus":{"_eval":"Id","value":"57283b4214dde6a43b46a7bb"},"listingType":{"$elemMatch":{"listingName":"Venture Capital","listingActive":true}}}},{"$unwind":"$listingType"},{"$match":{"listingType.listingName":"Venture Capital","listingType.listingActive":true}},{"$sort":{"name":1}},{"$project":{"orgId":1,"name":1,"address":1,"contact":1,"personnel":1,"chapterSpecification":1}}],"children":[{"id":4,"tag":"OrgInfo","parent":"3","type":"","printType":"","children":[{"id":5,"tag":"OrganizationID","parent":4,"type":"","printType":"value","children":[]},{"id":6,"tag":"OrganizationName","parent":4,"type":"","printType":"value","children":[]}]},{"id":7,"tag":"AddressInfo","parent":3,"type":"","printType":"","children":[{"id":8,"tag":"Address","parent":7,"type":"","printType":"","children":[{"id":9,"tag":"AddressStreet1","parent":8,"type":"","printType":"value","children":[]},{"id":10,"tag":"AddressCity","parent":8,"type":"","printType":"value","children":[]},{"id":11,"tag":"AddressStateTerritoryAbbr","parent":8,"type":"","printType":"value","children":[]},{"id":12,"tag":"AddressZip","parent":8,"type":"","printType":"value","children":[]}]}]},{"id":13,"tag":"ContactInfo","parent":3,"type":"","printType":"","children":[{"id":14,"tag":"ContactPhoneNo","parent":13,"type":"","printType":"value","children":[]},{"id":15,"tag":"ContactFax","parent":13,"type":"","printType":"value","children":[]},{"id":16,"tag":"ContactPrimaryEmail","parent":13,"type":"","printType":"value","children":[]},{"id":17,"tag":"ContactWebsites","parent":13,"type":"","printType":"value","children":[]}]},{"id":18,"tag":"InvestmentCommitteeOfficersInfo","parent":3,"type":"","printType":"","children":[{"id":19,"tag":"KeyPersonnel","parent":18,"type":"array","printType":"","children":[{"id":20,"tag":"KeyPersonnelFirstName","parent":19,"type":"","printType":"value","children":[]},{"id":21,"tag":"KeyPersonnelLastName","parent":19,"type":"","printType":"value","children":[]},{"id":22,"tag":"KeyPersonnelTitle","parent":19,"type":"","printType":"value","children":[]},{"id":23,"tag":"KeyPersonnelPhoneNo","parent":19,"type":"","printType":"value","children":[]}]}]},{"id":24,"tag":"NewBusinessContactOfficersInfo","parent":3,"type":"array","printType":"","children":[{"id":25,"tag":"KeyPersonnel","parent":24,"type":"","printType":"","children":[{"id":26,"tag":"KeyPersonnelFirstName","parent":25,"type":"","printType":"value","children":[]},{"id":27,"tag":"KeyPersonnelLastName","parent":25,"type":"","printType":"value","children":[]},{"id":28,"tag":"KeyPersonnelTitle","parent":25,"type":"","printType":"value","children":[]},{"id":29,"tag":"KeyPersonnelPhoneNo","parent":25,"type":"","printType":"value","children":[]}]}]},{"id":30,"tag":"MinimumOperatingDataInfo","parent":3,"type":"","printType":"","children":[{"id":31,"tag":"MinimumOperatingData","parent":30,"type":"","printType":"","children":[{"id":32,"tag":"ChapterSpecificationSpecificationTypeName","parent":31,"type":"","printType":"value","children":[]}]}]},{"id":33,"tag":"IndustryPreferenceInfo","parent":3,"type":"array","printType":"","children":[{"id":34,"tag":"IndustryPreference","parent":33,"type":"","printType":"","children":[{"id":35,"tag":"ChapterSpecificationSpecificationTypeName","parent":34,"type":"","printType":"value","children":[]}]}]},{"id":36,"tag":"FirmPrefersNotToInvestInInfo","parent":3,"type":"","printType":"","children":[{"id":37,"tag":"FirmPrefersNotToInvestIn","parent":36,"type":"","printType":"","children":[{"id":38,"tag":"ChapterSpecificationSpecificationTypeName","parent":37,"type":"","printType":"value","children":[]}]}]},{"id":39,"tag":"FeeStructureAndMethodCompensationInfo","parent":3,"type":"","printType":"","children":[{"id":40,"tag":"FeeStructureAndMethodCompensation","parent":39,"type":"","printType":"","children":[{"id":41,"tag":"ChapterSpecificationSpecificationTypeName","parent":40,"type":"","printType":"value","children":[]}]}]},{"id":42,"tag":"ExitCriteriaInfo","parent":3,"type":"","printType":"","children":[{"id":43,"tag":"ExitCriteria","parent":42,"type":"","printType":"","children":[{"id":44,"tag":"ChapterSpecificationSpecificationTypeName","parent":43,"type":"","printType":"value","children":[]}]}]},{"id":45,"tag":"EstablishInfo","parent":3,"type":"","printType":"","children":[{"id":46,"tag":"EstablishedYear","parent":45,"type":"","printType":"","children":[]}]},{"id":47,"tag":"InvesmentPortfolioSizeInfo","parent":3,"type":"","printType":"","children":[{"id":48,"tag":"InvesmentPortfolioSize","parent":47,"type":"","printType":"","children":[{"id":49,"tag":"ChapterSpecificationSpecificationTypeName","parent":48,"type":"","printType":"value","children":[]}]}]},{"id":50,"tag":"MainSourceOfCapitalInfo","parent":3,"type":"","printType":"","children":[{"id":51,"tag":"MainSourceOfCapital","parent":50,"type":"","printType":"","children":[{"id":52,"tag":"ChapterSpecificationSpecificationTypeName","parent":51,"type":"","printType":"value","children":[]}]}]},{"id":53,"tag":"FundsAvailableForInvesmentOrLoansInfo","parent":3,"type":"","printType":"","children":[{"id":54,"tag":"FundsAvailableForInvesmentOrLoans","parent":53,"type":"","printType":"","children":[{"id":55,"tag":"ChapterSpecificationSpecificationTypeName","parent":54,"type":"","printType":"value","children":[]}]}]},{"id":56,"tag":"MinimumSizeInvesmentInfo","parent":3,"type":"","printType":"","children":[{"id":57,"tag":"MinimumSizeInvesment","parent":56,"type":"","printType":"","children":[{"id":58,"tag":"ChapterSpecificationSpecificationTypeName","parent":57,"type":"","printType":"value","children":[]}]}]},{"id":59,"tag":"PreferredSizeInvesmentInfo","parent":3,"type":"","printType":"","children":[{"id":60,"tag":"PreferredSizeInvesment","parent":59,"type":"","printType":"","children":[{"id":61,"tag":"ChapterSpecificationSpecificationTypeName","parent":60,"type":"","printType":"value","children":[]}]}]},{"id":62,"tag":"AvgNumberOfDealsCompletedAnnuallyInfo","parent":3,"type":"","printType":"","children":[{"id":63,"tag":"AvgNumberOfDealsCompletedAnnually","parent":62,"type":"","printType":"","children":[{"id":64,"tag":"ChapterSpecificationSpecificationTypeName","parent":63,"type":"","printType":"value","children":[]}]}]},{"id":65,"tag":"AvgAmountInvestedAnnuallyInfo","parent":3,"type":"","printType":"","children":[{"id":66,"tag":"AvgAmountInvestedAnnually","parent":65,"type":"","printType":"","children":[{"id":67,"tag":"ChapterSpecificationSpecificationTypeName","parent":66,"type":"","printType":"value","children":[]}]}]}]}]}]}];
// var y= [{"id":1,"tag":"Sec","parent":"0","type":"","printType":"","children":[{"id":2,"tag":" ChapterName","parent":1,"type":"","printType":"","children":[{"id":3,"tag":"  Org","parent":2,"type":"array","printType":"","collection":"txn_organizations","qr":[{"$match":{"directoryId":{"_eval":"Id","value":"57189cc224d8bc65f4123bc1"},"status":{"_eval":"Id","value":"57283b4214dde6a43b46a7bb"},"workflowStatus":{"_eval":"Id","value":"57283b4214dde6a43b46a7bb"},"listingType":{"$elemMatch":{"listingName":"Venture Capital","listingActive":true}}}},{"$unwind":"$listingType"},{"$match":{"listingType.listingName":"Venture Capital","listingType.listingActive":true}},{"$sort":{"name":1}},{"$project":{"orgId":1,"name":1,"address":1,"contact":1,"personnel":1,"chapterSpecification":1}}],"children":[{"id":4,"tag":"   OrgInfo","parent":"3","type":"","printType":"","children":[{"id":5,"tag":"    OrganizationID","parent":4,"type":"","printType":"value","children":[]},{"id":6,"tag":"    OrganizationName","parent":4,"type":"","printType":"value","children":[]}]},{"id":7,"tag":"   AddressInfo","parent":3,"type":"","printType":"","children":[{"id":8,"tag":"Address","parent":7,"type":"","printType":"","children":[{"id":9,"tag":"AddressStreet1","parent":8,"type":"","printType":"value","children":[]},{"id":10,"tag":"AddressCity","parent":8,"type":"","printType":"value","children":[]},{"id":11,"tag":"AddressStateTerritoryAbbr","parent":8,"type":"","printType":"value","children":[]},{"id":12,"tag":"AddressZip","parent":8,"type":"","printType":"value","children":[]}]}]},{"id":13,"tag":"   ContactInfo","parent":3,"type":"","printType":"","children":[{"id":14,"tag":"ContactPhoneNo","parent":13,"type":"","printType":"value","children":[]},{"id":15,"tag":"ContactFax","parent":13,"type":"","printType":"value","children":[]},{"id":16,"tag":"ContactPrimaryEmail","parent":13,"type":"","printType":"value","children":[]},{"id":17,"tag":"ContactWebsites","parent":13,"type":"","printType":"value","children":[]}]},{"id":18,"tag":"   InvestmentCommitteeOfficersInfo","parent":3,"type":"","printType":"","children":[{"id":19,"tag":"KeyPersonnel","parent":18,"type":"array","printType":"","children":[{"id":20,"tag":"KeyPersonnelFirstName","parent":19,"type":"","printType":"value","children":[]},{"id":21,"tag":"KeyPersonnelLastName","parent":19,"type":"","printType":"value","children":[]},{"id":22,"tag":"KeyPersonnelTitle","parent":19,"type":"","printType":"value","children":[]},{"id":23,"tag":"KeyPersonnelPhoneNo","parent":19,"type":"","printType":"value","children":[]}]}]},{"id":24,"tag":"   NewBusinessContactOfficersInfo","parent":3,"type":"array","printType":"","children":[{"id":25,"tag":"KeyPersonnel","parent":24,"type":"","printType":"","children":[{"id":26,"tag":"KeyPersonnelFirstName","parent":25,"type":"","printType":"value","children":[]},{"id":27,"tag":"KeyPersonnelLastName","parent":25,"type":"","printType":"value","children":[]},{"id":28,"tag":"KeyPersonnelTitle","parent":25,"type":"","printType":"value","children":[]},{"id":29,"tag":"KeyPersonnelPhoneNo","parent":25,"type":"","printType":"value","children":[]}]}]},{"id":30,"tag":"   MinimumOperatingDataInfo","parent":3,"type":"","printType":"","children":[{"id":31,"tag":"MinimumOperatingData","parent":30,"type":"","printType":"","children":[{"id":32,"tag":"ChapterSpecificationSpecificationTypeName","parent":31,"type":"","printType":"value","children":[]}]}]},{"id":33,"tag":"   IndustryPreferenceInfo","parent":3,"type":"array","printType":"","children":[{"id":34,"tag":"IndustryPreference","parent":33,"type":"","printType":"","children":[{"id":35,"tag":"ChapterSpecificationSpecificationTypeName","parent":34,"type":"","printType":"value","children":[]}]}]},{"id":36,"tag":"FirmPrefersNotToInvestInInfo","parent":3,"type":"","printType":"","children":[{"id":37,"tag":"FirmPrefersNotToInvestIn","parent":36,"type":"","printType":"","children":[{"id":38,"tag":"ChapterSpecificationSpecificationTypeName","parent":37,"type":"","printType":"value","children":[]}]}]},{"id":39,"tag":"FeeStructureAndMethodCompensationInfo","parent":3,"type":"","printType":"","children":[{"id":40,"tag":"FeeStructureAndMethodCompensation","parent":39,"type":"","printType":"","children":[{"id":41,"tag":"ChapterSpecificationSpecificationTypeName","parent":40,"type":"","printType":"value","children":[]}]}]},{"id":42,"tag":"ExitCriteriaInfo","parent":3,"type":"","printType":"","children":[{"id":43,"tag":"ExitCriteria","parent":42,"type":"","printType":"","children":[{"id":44,"tag":"ChapterSpecificationSpecificationTypeName","parent":43,"type":"","printType":"value","children":[]}]}]},{"id":45,"tag":"EstablishInfo","parent":3,"type":"","printType":"","children":[{"id":46,"tag":"EstablishedYear","parent":45,"type":"","printType":"","children":[]}]},{"id":47,"tag":"InvesmentPortfolioSizeInfo","parent":3,"type":"","printType":"","children":[{"id":48,"tag":"InvesmentPortfolioSize","parent":47,"type":"","printType":"","children":[{"id":49,"tag":"ChapterSpecificationSpecificationTypeName","parent":48,"type":"","printType":"value","children":[]}]}]},{"id":50,"tag":"MainSourceOfCapitalInfo","parent":3,"type":"","printType":"","children":[{"id":51,"tag":"MainSourceOfCapital","parent":50,"type":"","printType":"","children":[{"id":52,"tag":"ChapterSpecificationSpecificationTypeName","parent":51,"type":"","printType":"value","children":[]}]}]},{"id":53,"tag":"FundsAvailableForInvesmentOrLoansInfo","parent":3,"type":"","printType":"","children":[{"id":54,"tag":"FundsAvailableForInvesmentOrLoans","parent":53,"type":"","printType":"","children":[{"id":55,"tag":"ChapterSpecificationSpecificationTypeName","parent":54,"type":"","printType":"value","children":[]}]}]},{"id":56,"tag":"MinimumSizeInvesmentInfo","parent":3,"type":"","printType":"","children":[{"id":57,"tag":"MinimumSizeInvesment","parent":56,"type":"","printType":"","children":[{"id":58,"tag":"ChapterSpecificationSpecificationTypeName","parent":57,"type":"","printType":"value","children":[]}]}]},{"id":59,"tag":"PreferredSizeInvesmentInfo","parent":3,"type":"","printType":"","children":[{"id":60,"tag":"PreferredSizeInvesment","parent":59,"type":"","printType":"","children":[{"id":61,"tag":"ChapterSpecificationSpecificationTypeName","parent":60,"type":"","printType":"value","children":[]}]}]},{"id":62,"tag":"AvgNumberOfDealsCompletedAnnuallyInfo","parent":3,"type":"","printType":"","children":[{"id":63,"tag":"AvgNumberOfDealsCompletedAnnually","parent":62,"type":"","printType":"","children":[{"id":64,"tag":"ChapterSpecificationSpecificationTypeName","parent":63,"type":"","printType":"value","children":[]}]}]},{"id":65,"tag":"AvgAmountInvestedAnnuallyInfo","parent":3,"type":"","printType":"","children":[{"id":66,"tag":"AvgAmountInvestedAnnually","parent":65,"type":"","printType":"","children":[{"id":67,"tag":"ChapterSpecificationSpecificationTypeName","parent":66,"type":"","printType":"value","children":[]}]}]}]}]}]}];
// var z =[
//   {
//     "id": 1,
//     "tag": "Sec",
//     "parent": 0,
//     "value": "",
//     "collection": "",
//     "query": ""
//   },
//   {
//     "id": 2,
//     "tag": "-Org",
//     "parent": 1,
//     "value": "",
//     "collection": "txn_organization",
//     "query": [{"$match":{"directoryId":{"_eval":"Id","value":"57189cc224d8bc65f4123bc1"},"status":{"_eval":"Id","value":"57283b4214dde6a43b46a7bb"},"workflowStatus":{"_eval":"Id","value":"57283b4214dde6a43b46a7bb"},"listingType":{"$elemMatch":{"listingName":"Venture Capital","listingActive":true}}}},{"$unwind":"$listingType"},{"$match":{"listingType.listingName":"Venture Capital","listingType.listingActive":true}},{"$sort":{"name":1}},{"$project":{"org_id":1,"name":1,"address":1,"contact":1,"personnel":1,"chapterSpecification":1}}]
//   },
//   {
//     "id": 3,
//     "tag": "--Name",
//     "parent": 2,
//     "value": "value",
//     "collection": "",
//     "query": ""
//   },
//   {
//     "id": 4,
//     "tag": "--ID",
//     "parent": 2,
//     "value": "value",
//     "collection": "",
//     "query": ""
//   }
// ];
// fun2.exec(z);

////////////////////////////////fun3.js///////////////////////////////////////////////

var z =[
  {
    "id": 1,
    "tag": "Org",
    "parent": 0,
    "value": "",
    "collection": "txn_organization",
    "query": [{"$match":{"_id":{"_eval":"Id","value":"577e6a1fc19c234cf6e387d5"}}}],
    "children" : []
  },
  {
    "id": 2,
    "tag": "add",
    "parent":1,
    "value": "",
    "children" : []
  },
  {
    "id": 3,
    "tag": "Par",
    "parent": 2,
    "value": "",
    "collection": "txn_organization",
    "query": [[{$match: { "_id": {"_eval":"Id","value":"577e6a1fc19c234cf6e387d5" }} }, {$unwind: "$personnel"}, {$lookup: {"from" : "txn_personnels", "localField" : "personnel", "foreignField" : "_id", "as" : "personnel"} }, {$unwind: "$personnel"}, {$match: {"personnel.deleted":false } }, {$group: {_id:"_id", Per:{$addToSet:"$personnel"} } } ]],
    "children" : []
  },
  {
    "id": 4,
    "tag": "--Name",
    "parent": 2,
    "value": "value",
    "collection": "txn_organization",
    "query": [{"$match":{"_id":{"_eval":"Id","value":"577e6a1fc19c234cf6e387e7"}}}],
    "children" : []
  }
];
fun3.exec(z);

  // function pFun(){
  //   return new Promise(function(res,rej){
  //     if(1)
  //       res(true);
  //     elsed
  //       rej(false);
  //   })
  // }
  // pFun().then(function(res){
  //   console.log(res);
  // },function(err){
  // console.log(res);
  // })

//--------------------- fun3.js-------------------------------------------------------
