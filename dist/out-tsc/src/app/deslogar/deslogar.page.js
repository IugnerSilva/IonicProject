import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DBService } from '../services/db.services';
var DeslogarPage = /** @class */ (function () {
    function DeslogarPage(database) {
        this.database = database;
        this.init();
    }
    DeslogarPage.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.database.deslogar()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeslogarPage.prototype.ngOnInit = function () {
    };
    DeslogarPage = tslib_1.__decorate([
        Component({
            selector: 'app-deslogar',
            templateUrl: './deslogar.page.html',
            styleUrls: ['./deslogar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [DBService])
    ], DeslogarPage);
    return DeslogarPage;
}());
export { DeslogarPage };
//# sourceMappingURL=deslogar.page.js.map