import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Produto } from '../model/produto';
var CadastroProdutoPage = /** @class */ (function () {
    function CadastroProdutoPage(router, database, modalController, loadingCtrl, toastCtrl) {
        this.router = router;
        this.database = database;
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.carregando = true;
        this.novoProduto = new Produto();
        { }
        this.loadAddressList();
    }
    CadastroProdutoPage.prototype.ngOnInit = function () {
    };
    CadastroProdutoPage.prototype.loadAddressList = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.database.listWithUIDs('/categoria')];
                    case 1:
                        _a.categoriaList = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CadastroProdutoPage.prototype.cadastro = function () {
        this.router.navigate(['/listaProdutos']);
    };
    CadastroProdutoPage.prototype.cadastrar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.database.inserir('produtos', this.novoProduto)
                            .then(function () {
                            _this.presentToast('Produto adicionado com sucesso !');
                            _this.novoProduto = new Produto();
                            _this.loading.dismiss();
                            _this.cadastro();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CadastroProdutoPage.prototype.presentLoading = function () {
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
    CadastroProdutoPage.prototype.presentToast = function (message) {
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
    CadastroProdutoPage = tslib_1.__decorate([
        Component({
            selector: 'app-cadastro-produto',
            templateUrl: './cadastro-produto.page.html',
            styleUrls: ['./cadastro-produto.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DBService,
            ModalController,
            LoadingController,
            ToastController])
    ], CadastroProdutoPage);
    return CadastroProdutoPage;
}());
export { CadastroProdutoPage };
//# sourceMappingURL=cadastro-produto.page.js.map