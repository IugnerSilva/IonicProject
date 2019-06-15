import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
var MenuPage = /** @class */ (function () {
    function MenuPage(router, database) {
        var _this = this;
        this.router = router;
        this.database = database;
        this.pages = [{
                title: 'Início',
                url: '/menu/home'
            }, {
                title: 'Limpeza',
                url: '/menu/limpeza'
            },
            {
                title: 'Cereais',
                url: '/menu/cereais'
            }, {
                title: 'Lista de Clientes',
                url: '/menu/listaCliente'
            }, {
                title: 'Sair',
                url: '/menu/deslogar'
            }
        ];
        this.selectedPath = '';
        this.router.events.subscribe(function (event) {
            _this.selectedPath = event.url;
        });
    }
    MenuPage.prototype.ngOnInit = function () {
    };
    MenuPage = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.page.html',
            styleUrls: ['./menu.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DBService])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.page.js.map