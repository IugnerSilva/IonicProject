import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CarService } from '../services/carrinho.services';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(router, database, modalController, loadingCtrl, toastCtrl, cartService) {
        this.router = router;
        this.database = database;
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.cartService = cartService;
        this.cart = [];
        this.items = [];
        this.sliderConfig = {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 1.6
        };
        this.carregando = true;
        this.init();
    }
    HomePage.prototype.init = function () {
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
    HomePage.prototype.carregarProdutos = function () {
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
    HomePage.prototype.remove = function (uid) {
        var _this = this;
        this.database.remover('/produtos', uid)
            .then(function () {
            _this.presentToast('Produto removido com sucesso !');
            _this.carregarProdutos();
        });
    };
    HomePage.prototype.presentLoading = function () {
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
    HomePage.prototype.presentToast = function (message) {
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
    HomePage.prototype.novo = function () {
        this.router.navigate(['/cadastroProduto']);
    };
    HomePage.prototype.abrirCarrinho = function () {
        this.router.navigate(['/carrinho']);
    };
    HomePage.prototype.adicionarCarrinho = function (produto) {
        this.cartService.addProduto(produto);
    };
    HomePage.prototype.loadAddressList = function () {
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
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
            providers: [CarService]
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DBService, ModalController,
            LoadingController, ToastController, CarService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map