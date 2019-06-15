import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var CarService = /** @class */ (function () {
    function CarService() {
        this.data = [{
                categoria: "cereais",
                expanded: true,
                produtos: [
                    { id: 0, nome: 'feijao', preco: '5.60' },
                    { id: 1, nome: 'cuzcuz', preco: '1.60' },
                    { id: 2, nome: 'arroz', preco: '2.60' },
                ]
            }, {
                categoria: "bolacha",
                produtos: [
                    { id: 3, nome: 'vitarela', preco: '3.20' },
                    { id: 4, nome: 'pilar', preco: '2.60' },
                    { id: 5, nome: 'maizena', preco: '3.20' },
                ]
            }];
        this.cart = [];
    }
    CarService.prototype.getProdutos = function () {
        return this.data;
    };
    CarService.prototype.getCart = function () {
        return this.cart;
    };
    CarService.prototype.addProduto = function (produto) {
        this.cart.push(produto);
    };
    CarService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], CarService);
    return CarService;
}());
export { CarService };
//# sourceMappingURL=carrinho.services.js.map