//import * as express from "express";
import * as mongoose from "mongoose";

mongoose.connect('mongodb://192.168.10.178/tw-prod-03-10-2017');
//mongoose.Promise = global.Promise;


var Cat =  new mongoose.Schema({ name: String });

const User = mongoose.model("Bat", Cat);
//export default User;

var kitty = new User({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});
