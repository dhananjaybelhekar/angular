//import * as express from "express";
import * as mongoose from "mongoose";
import * as async from "async";
import * as mainctrl from "./main.ctrl";


mongoose.connect('mongodb://localhost/test');
//mongoose.Promise = global.Promise;


// var Cat =  new mongoose.Schema({ name: String });

// const User = mongoose.model("Bat", Cat);
//export default User;
mainctrl.save();



async.waterfall([
    function(callback:any) {
        callback(null, 'one', 'two');
    },
    function(arg1:any, arg2:any, callback:any) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function(arg1:any, callback:any) {
        // arg1 now equals 'three'
        callback(null, 'dhananjay**********************************************');
    }
], function (err:any, result:any) {
    console.log(result);
});
