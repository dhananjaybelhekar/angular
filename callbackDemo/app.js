const express = require('express')
const app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.json())

mongoose.connect('mongodb://192.168.10.178/tw-prod-17-10-2017', { useMongoClient: true });
mongoose.Promise = global.Promise;





var coll = [{"collection":"OLD_mst_cms_menus", "obj":""}, {"collection":"cats", "obj":""}, {"collection":"mst_acl_actions", "obj":""}, {"collection":"mst_acl_modules", "obj":""}, {"collection":"mst_acl_pages", "obj":""}, {"collection":"mst_email_templates", "obj":""}, {"collection":"mst_menus", "obj":""}, {"collection":"mst_refcodetypes", "obj":""}, {"collection":"mst_refcodevalues", "obj":""}, {"collection":"mst_securityquestions", "obj":""}, {"collection":"products_services", "obj":""}, {"collection":"summary_counts", "obj":""}, {"collection":"tmp_aam_members", "obj":""}, {"collection":"tmp_aam_members_back", "obj":""}, {"collection":"tmp_acc_museums", "obj":""}, {"collection":"tmp_acc_museums_back", "obj":""}, {"collection":"txn_assignmaxids", "obj":""}, {"collection":"txn_batchjobs", "obj":""}, {"collection":"txn_chapterspecifications", "obj":""}, {"collection":"txn_customer_feedbacks", "obj":""}, {"collection":"txn_events", "obj":""}, {"collection":"txn_exhibitions", "obj":""}, {"collection":"txn_organizations", "obj":""}, {"collection":"txn_orgversions", "obj":""}, {"collection":"txn_personnels", "obj":""}, {"collection":"txn_roles", "obj":""}, {"collection":"txn_subscriptionpackages", "obj":""}, {"collection":"txn_templates", "obj":""}, {"collection":"txn_todos", "obj":""}, {"collection":"txn_useraccesslogs", "obj":""}, {"collection":"txn_userresetpasswordtokens", "obj":""}, {"collection":"txn_users", "obj":""}, {"collection":"txn_usertokens", "obj":""}, {"collection":"txn_webdatas", "obj":""}, {"collection":"txn_webrequests", "obj":""}, {"collection":"txn_webuserlogs", "obj":""}, {"collection":"txn_webusers", "obj":""}, {"collection":"txn_webusertokens", "obj":""}, {"collection":"zz_audits", "obj":""}, {"collection":"zz_exceptions", "obj":""}, {"collection":"zz_maillogs""obj":""} ]

for(var i=0;i<coll.length;i++)
{
	coll[i].obj = mongoose.model(coll[i].collection, {});
}

app.post('/test', function (req, res) {
	
	//var kitty = new Cat({ name: 'Zildjian' });
	console.log(req.body);
	Cat[req.body.qrType](evaluate(req.body.qr)).exec(function(err,data){
		res.send(data);
	})
	// console.log("req.body",req.body);
	// res.send(req.body.db)
	// kitty.save(function (err) {
	//   if (err) {
	//     console.log(err);
	//   } else {
	//     res.send("success");
	//   }
	// });  
	//////////
	/*
	{
  "db": "mst_refcodevalues",
  "qr": {
    "codeTypeId": {
      "_eval": "Id",
      "value": "57160268b7589e585d33f765"
    }
  },
  "qrType": "find"
}

*/
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function evaluate(object) {
    if (object && object.constructor === Array) {
        for (var i = 0; i < object.length; i++) {
            object[i] = evaluate(object[i]);
        }
    } else if (object && typeof object == 'object' && Object.keys(object).length > 0) {
        if (Object.keys(object).indexOf('_eval') < 0) {
            for (var key in object) {
                object[key] = evaluate(object[key]);
            }
        } else switch (object['_eval']) {
            case 'Id':
                {
                    object = mongoose.Types.ObjectId(object['value']);
                    break;
                }
            case 'regex':
                {
                    object = new RegExp(object['value'], 'i');
                    break;
                }
            case 'Date':
                {
                    var d = new Date(object['value']);
                    object = d.toISOString();
                    break;
                }

        }
    }
    return object;
}

