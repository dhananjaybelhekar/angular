var x= [
  {
    "id": 1,
    "tag": "Sec",
    "parent": 0,
    "value": "",
    "collection": "",
    "query": ""
  },
  {
    "id": 2,
    "tag": "-Org",
    "parent": 1,
    "value": "",
    "collection": "txn_organization",
    "query": [{"$match":{"directoryId":{"_eval":"Id","value":"57189cc224d8bc65f4123bc1"},"status":{"_eval":"Id","value":"57283b4214dde6a43b46a7bb"},"workflowStatus":{"_eval":"Id","value":"57283b4214dde6a43b46a7bb"},"listingType":{"$elemMatch":{"listingName":"Venture Capital","listingActive":true}}}},{"$unwind":"$listingType"},{"$match":{"listingType.listingName":"Venture Capital","listingType.listingActive":true}},{"$sort":{"name":1}},{"$project":{"org_id":1,"name":1,"address":1,"contact":1,"personnel":1,"chapterSpecification":1}}]
  },
  {
    "id": 3,
    "tag": "--Name",
    "parent": 2,
    "value": "value",
    "collection": "",
    "query": ""
  },
  {
    "id": 4,
    "tag": "--ID",
    "parent": 2,
    "value": "value",
    "collection": "",
    "query": ""
  }
];

function addChildren(arr){
		return arr.map(function(data) {
		    data.children = [];
		    return data;
		})
	//	bunflatten(arr);
}

x= addChildren(x);

function bunflatten(nodes) {  
    var map = {}, _NODE, roots = [];
    for (var i = 0; i < nodes.length; i += 1) {
        _NODE = nodes[i];
        _NODE.children = [];
        map[_NODE.id] = i;
        if (_NODE.parent !== 1) {
            _NODE.children = [];
            nodes[map[_NODE.parent]].children.push(_NODE);
        } else {
            roots.push(_NODE);
        }
    }
    return roots;
}
console.log(bunflatten(x))
