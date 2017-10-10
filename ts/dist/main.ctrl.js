"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sub_1 = require("./sub");
exports.save = function () {
    var kitty = new sub_1.default({ name: 'Zildjian' });
    kitty.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('meow');
        }
    });
};
