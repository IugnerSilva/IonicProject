import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
var Firebase = /** @class */ (function () {
    function Firebase(db) {
        this.db = db;
        console.log('Hello Firebase Provider');
    }
    Firebase.prototype.save = function (course) {
        this.db.list('course')
            .push(course).then(function (r) { return console
            .log(r); });
    };
    Firebase = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], Firebase);
    return Firebase;
}());
export { Firebase };
//# sourceMappingURL=firebase.js.map