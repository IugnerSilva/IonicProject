import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
var LoggedGuard = /** @class */ (function () {
    function LoggedGuard(database, router) {
        this.database = database;
        this.router = router;
    }
    LoggedGuard.prototype.canActivate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.database.getAuth().onAuthStateChanged(function (user) {
                if (user)
                    _this.router.navigate(['login']);
                resolve(!user ? true : false);
            });
        });
    };
    LoggedGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [DBService,
            Router])
    ], LoggedGuard);
    return LoggedGuard;
}());
export { LoggedGuard };
//# sourceMappingURL=login.guard.js.map