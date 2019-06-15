import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { Cliente } from '../model/cliente';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CameraService } from '../services/camera.services';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AngularFireAuth } from '@angular/Fire/auth';
var CadastroPage = /** @class */ (function () {
    function CadastroPage(router, database, modalController, cameraService, loadingCtrl, afa, toastCtrl) {
        this.router = router;
        this.database = database;
        this.modalController = modalController;
        this.cameraService = cameraService;
        this.loadingCtrl = loadingCtrl;
        this.afa = afa;
        this.toastCtrl = toastCtrl;
        this.carregando = true;
        this.novoCliente = new Cliente();
    }
    CadastroPage.prototype.cadastro = function () {
        this.router.navigate(['/listaCliente']);
    };
    CadastroPage.prototype.cadastrar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.afa.auth.createUserWithEmailAndPassword(this.novoCliente.email, this.novoCliente.senha);
                        this.database.inserir('cliente', this.novoCliente)
                            .then(function () {
                            //this.presentToast(message);
                            _this.novoCliente = new Cliente();
                            _this.loading.dismiss();
                            _this.cadastro();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CadastroPage.prototype.tirarFoto = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.novoCliente;
                        return [4 /*yield*/, this.cameraService.tirarFoto()];
                    case 1:
                        _a.picture = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CadastroPage.prototype.presentLoading = function () {
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
    CadastroPage.prototype.presentToast = function (message) {
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
    CadastroPage = tslib_1.__decorate([
        Component({
            selector: 'app-cadastro',
            templateUrl: './cadastro.page.html',
            styleUrls: ['./cadastro.page.scss'],
            providers: [DBService, CameraService, Camera, Base64]
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DBService,
            ModalController,
            CameraService,
            LoadingController,
            AngularFireAuth,
            ToastController])
    ], CadastroPage);
    return CadastroPage;
}());
export { CadastroPage };
//# sourceMappingURL=cadastro.page.js.map