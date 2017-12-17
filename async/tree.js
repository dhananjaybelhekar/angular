var z=[
{id:1,parent:0,name:'main'},
{id:2,parent:1,name:'sub'},
{id:3,parent:2,name:'name',type:'arr',lavel:"name"},
{id:4,parent:3,name:'first',text:'',lavel:"name.first"},
{id:5,parent:3,name:'last',text:'',lavel:"name.contact.foo"}];

var data=
{name:
{first:'dhananjay',last:'belhekar',contact:{"foo":"bar"}},
};

function bunflatten(nodes) {
    var map = {}, _NODE, roots = [];
    for (var i = 0; i < nodes.length; i += 1) {
        _NODE = nodes[i];
        _NODE.children = [];
        map[_NODE.id] = i;
        if (_NODE.parent !== 0) {
            _NODE.children = [];
            nodes[map[_NODE.parent]].children.push(_NODE);
        } else {
            roots.push(_NODE);
        }
    }
    return roots;
}
var z = bunflatten(z);
var arr2=[];
function show(data)
{
  for(var i in data)
  {
  	if(data[i].children.length > 0)
    {
    show(data[i].children);
    }
    var temp=data[i];
   if(temp.children)
   delete temp.children;
    arr2.unshift(temp);
  }
}
//show(zz);
//console.log("arr2",)
//arr2=_.reverse(arr2)
//console.log("arr2_tree",bunflatten(arr2))


 var arr=[];
function insertData(tree,data){
  for(var i in z)
  {
  	if(data[i].children.length > 0 && data[i].type && data[i].lavel)
    {
    insertData(data[i].children,_.at(data,z[i].lavel)[0])
    }
    if(z[i].lavel)
    {
    z[i].text=_.at(data,z[i].lavel)[0]
    }
    arr.push(z[i]);
  } 
}
insertData();
//   z[i].text=_.at(data,z[i].lavel)[0]

console.log(arr);
