"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as express from "express";
var mongoose = require("mongoose");
var async = require("async");
var mainctrl = require("./main.ctrl");
mongoose.connect('mongodb://192.168.10.178/tw-prod-03-10-2017');
//mongoose.Promise = global.Promise;
// var Cat =  new mongoose.Schema({ name: String });
// const User = mongoose.model("Bat", Cat);
//export default User;
mainctrl.save();
async.waterfall([
    function (callback) {
        callback(null, 'one', 'two');
    },
    function (arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function (arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'dhananjay**********************************************');
    }
], function (err, result) {
    console.log(result);
});
