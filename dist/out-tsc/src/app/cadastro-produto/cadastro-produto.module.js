import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CadastroProdutoPage } from './cadastro-produto.page';
var routes = [
    {
        path: '',
        component: CadastroProdutoPage
    }
];
var CadastroProdutoPageModule = /** @class */ (function () {
    function CadastroProdutoPageModule() {
    }
    CadastroProdutoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CadastroProdutoPage]
        })
    ], CadastroProdutoPageModule);
    return CadastroProdutoPageModule;
}());
export { CadastroProdutoPageModule };
//# sourceMappingURL=cadastro-produto.module.js.map