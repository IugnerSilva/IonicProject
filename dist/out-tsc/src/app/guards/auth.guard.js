import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, database) {
        this.router = router;
        this.database = database;
    }
    AuthGuard.prototype.canActivate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.database.getAuth().onAuthStateChanged(function (user) {
                if (!user)
                    _this.router.navigate(['login']);
                resolve(user ? true : false);
            });
        });
    };
    AuthGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DBService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map