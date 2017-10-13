var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://localhost/temp', { useMongoClient: true, promiseLibrary: global.Promise });

var Cat = mongoose.model('mst_refcodevalues', { });

var cb= function(d,cb){ 
  console.log("data",d);
 // cb(d,cb);
 //show({_id:d.parentId},cb);
};

function show(qr){
  fs.appendFile('file3.js', JSON.stringify(qr,null,4), function(err) {
    if (err) throw err;
    console.log('file saved');
  });

  Cat.find(qr).exec(function(err,data){
    for(var  i=0;i<data.length;i++)
    {
show({_id:data[i].parentId});
    }
  });
}
//show({parentId:{$ne:null}});

show({_id:new mongoose.Types.ObjectId("576230b9c19c494dcc08cece")});

console.log("done");

// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) 
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });
// function show(val,cb){
//   console.log(val);
//   Cat.find({_id:val._id}).exec(function(err,data){
//     return cb(data,cb);
//   });
// }
// var cb = function(dt,cb){
// //  console.log("call",dt);
//   show(dt,cb);
// }
// show(cb);

// Cat.find({}).exec(function(err,data){
//   for(var i=0;i<data.length;i++){
//     cb(data[i],cb);
//   }
  
// });

// function 223232show(cb)
// {
//   var d=5;
//   cb(d);
// }
// show(function(x){ console.log(x);})

// class  temp
// {
//   constructor(){
//     this.data = 10;
//   }
//   show(dd)
//   {
//     dd(this.data);
//   }
//   cb(data){
//     console.log("data",data);
//   }

// }


// var o = new temp();
// o.show(o.cb);