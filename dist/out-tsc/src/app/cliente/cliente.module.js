import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ClientePage } from './cliente.page';
var routes = [
    {
        path: '',
        component: ClientePage
    }
];
var ClientePageModule = /** @class */ (function () {
    function ClientePageModule() {
    }
    ClientePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ClientePage]
        })
    ], ClientePageModule);
    return ClientePageModule;
}());
export { ClientePageModule };
//# sourceMappingURL=cliente.module.js.map