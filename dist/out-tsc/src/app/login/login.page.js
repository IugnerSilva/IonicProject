import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { AngularFireAuth } from '@angular/Fire/auth';
import { DBService } from '../services/db.services';
var LoginPage = /** @class */ (function () {
    function LoginPage(router, loadingCtrl, toastCtrl, afa, database) {
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.afa = afa;
        this.database = database;
        this.cliente = new Cliente;
    }
    LoginPage.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        try {
                            this.afa.auth.signInWithEmailAndPassword(this.cliente.email, this.cliente.senha);
                            this.router.navigate(['/menu/home']);
                        }
                        catch (error) {
                            this.presentToast(error.message);
                        }
                        finally {
                            this.loading.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({ message: 'Por favor, aguarde ...' })];
                    case 1:
                        _a.loading = _b.sent();
                        return [2 /*return*/, this.loading.present()];
                }
            });
        });
    };
    LoginPage.prototype.presentToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({ message: message, duration: 2000 })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.cadastra = function () {
        this.router.navigate(['/cadastro']);
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: 'login.page.html',
            styleUrls: ['login.page.scss'],
            providers: [DBService]
        }),
        tslib_1.__metadata("design:paramtypes", [Router, LoadingController, ToastController,
            AngularFireAuth,
            DBService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map