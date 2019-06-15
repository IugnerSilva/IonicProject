import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CarService } from '../services/carrinho.services';
var CarrinhoPage = /** @class */ (function () {
    function CarrinhoPage(carService) {
        this.carService = carService;
        this.selectedItems = [];
        this.total = 0;
    }
    CarrinhoPage.prototype.ngOnInit = function () {
        var items = this.carService.getCart();
        var selected = {};
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var obj = items_1[_i];
            if (selected[obj.id]) {
                selected[obj.id].count++;
            }
            else {
                selected[obj.id] = tslib_1.__assign({}, obj, { count: 1 });
            }
        }
        this.selectedItems = Object.keys(selected).map(function (key) { return selected[key]; });
        console.log('items: ', this.selectedItems);
        this.total = this.selectedItems.reduce(function (a, b) { return a + (b.count * b.preco); }, 0);
    };
    CarrinhoPage = tslib_1.__decorate([
        Component({
            selector: 'app-carrinho',
            templateUrl: './carrinho.page.html',
            styleUrls: ['./carrinho.page.scss'],
            providers: [CarService]
        }),
        tslib_1.__metadata("design:paramtypes", [CarService])
    ], CarrinhoPage);
    return CarrinhoPage;
}());
export { CarrinhoPage };
//# sourceMappingURL=carrinho.page.js.map