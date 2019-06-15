import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CadastroPage } from '../cadastro/cadastro.page';
var ListaClientePage = /** @class */ (function () {
    function ListaClientePage(router, database, modalController, loadingCtrl, toastCtrl) {
        this.router = router;
        this.database = database;
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.carregando = true;
        this.init();
    }
    ListaClientePage.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.carregando = true;
                        //await this.presentLoading();
                        return [4 /*yield*/, this.carregarClientes()];
                    case 1:
                        //await this.presentLoading();
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListaClientePage.prototype.carregarClientes = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.database.listar('/cliente')
                            .then(function (clientes) {
                            _this.clientes = clientes;
                            _this.carregando = false;
                            _this.loading.dismiss();
                        }).catch(function (error) {
                            console.log(error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListaClientePage.prototype.remove = function (uid) {
        var _this = this;
        this.database.remover('/cliente', uid)
            .then(function () {
            alert('Cliente removido com sucesso');
            _this.carregarClientes();
        });
    };
    ListaClientePage.prototype.editar = function (cliente) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: CadastroPage,
                            componentProps: {
                                editingCliente: cliente
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (result) {
                            if (result.data) {
                                alert('Cliente editado com sucesso');
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListaClientePage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({ message: 'Por favor,aguarde...' })];
                    case 1:
                        _a.loading = _b.sent();
                        return [2 /*return*/, this.loading.present()];
                }
            });
        });
    };
    ListaClientePage.prototype.presentToast = function (message) {
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
    ListaClientePage.prototype.novo = function () {
        this.router.navigate(['/cadastro']);
    };
    ListaClientePage.prototype.ngOnInit = function () {
    };
    ListaClientePage = tslib_1.__decorate([
        Component({
            selector: 'app-lista-cliente',
            templateUrl: './lista-cliente.page.html',
            styleUrls: ['./lista-cliente.page.scss'],
            providers: [DBService]
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DBService, ModalController,
            LoadingController, ToastController])
    ], ListaClientePage);
    return ListaClientePage;
}());
export { ListaClientePage };
//# sourceMappingURL=lista-cliente.page.js.map