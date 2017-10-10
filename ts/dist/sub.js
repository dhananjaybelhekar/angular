"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Cat = new mongoose.Schema({ name: String });
var User = mongoose.model("Bat", Cat);
var rat = mongoose.model("rat", Cat);
exports.default = User;
