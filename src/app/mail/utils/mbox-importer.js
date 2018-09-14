"use strict";
exports.__esModule = true;
var observable_mbox_1 = require("./observable-mbox");
var mailparser_1 = require("mailparser");
var rxjs_1 = require("rxjs");
var MboxImporter = /** @class */ (function () {
    function MboxImporter(mailService) {
        this.mailService = mailService;
    }
    MboxImporter.prototype["import"] = function (filename) {
        return observable_mbox_1.ObservableMbox["import"](filename)
            .concatMap(function (msg) {
            // me.parsedSize += msg.length;
            return rxjs_1.Observable.fromPromise(mailparser_1.simpleParser(new Buffer(msg)));
        })
            .take(10)
            .subscribe(function (mail) {
            // mail.tags = '#inbox';
            console.dir(mail, { depth: null, colors: true });
            // this.mailService.save(mail, true);
        }, function () { return console.error(); }, function () { return console.log('complete'); });
    };
    return MboxImporter;
}());
exports.MboxImporter = MboxImporter;
