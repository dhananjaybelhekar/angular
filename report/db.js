var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });

var Cat = mongoose.model('Cat', { name: String });

// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });
function show(cb){
  Cat.find({}).exec(function(err,data){
    return cb(data);
  });
  return show;
}
console.log("show=",show(function(dt){   return dt;}));


// function show(cb)
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