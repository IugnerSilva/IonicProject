import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
var ListaProdutosPage = /** @class */ (function () {
    function ListaProdutosPage(router, database, modalController, loadingCtrl, toastCtrl) {
        this.router = router;
        this.database = database;
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.carregando = true;
        this.init();
    }
    ListaProdutosPage.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.carregando = true;
                        return [4 /*yield*/, this.carregarProdutos()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListaProdutosPage.prototype.carregarProdutos = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.database.listar('/produtos')
                            .then(function (produtos) {
                            _this.produtos = produtos;
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
    ListaProdutosPage.prototype.remove = function (uid) {
        var _this = this;
        this.database.remover('/produtos', uid)
            .then(function () {
            _this.presentToast('Produto removido com sucesso !');
            _this.carregarProdutos();
        });
    };
    ListaProdutosPage.prototype.presentLoading = function () {
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
    ListaProdutosPage.prototype.presentToast = function (message) {
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
    ListaProdutosPage.prototype.novo = function () {
        this.router.navigate(['/cadastroProduto']);
    };
    ListaProdutosPage.prototype.ngOnInit = function () {
    };
    ListaProdutosPage = tslib_1.__decorate([
        Component({
            selector: 'app-lista-produtos',
            templateUrl: './lista-produtos.page.html',
            styleUrls: ['./lista-produtos.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DBService, ModalController,
            LoadingController, ToastController])
    ], ListaProdutosPage);
    return ListaProdutosPage;
}());
export { ListaProdutosPage };
//# sourceMappingURL=lista-produtos.page.js.map