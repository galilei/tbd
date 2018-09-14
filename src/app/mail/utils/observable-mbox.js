"use strict";
exports.__esModule = true;
var Mbox = require("node-mbox");
var Observable_1 = require("rxjs/Observable");
var ObservableMbox = /** @class */ (function () {
    function ObservableMbox() {
    }
    ObservableMbox["import"] = function (filename) {
        return Observable_1.Observable.create(function (observer) {
            var mbox = new Mbox(filename);
            mbox.on('message', function (msg) { return observer.next(msg); });
            mbox.on('end', function () { return observer.complete(); });
            mbox.on('error', function (err) { return observer.error(err); });
            observer.add(function () { return mbox.end(); });
        });
    };
    return ObservableMbox;
}());
exports.ObservableMbox = ObservableMbox;
