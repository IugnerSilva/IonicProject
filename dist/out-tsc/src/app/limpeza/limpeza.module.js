import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LimpezaPage } from './limpeza.page';
var routes = [
    {
        path: '',
        component: LimpezaPage
    }
];
var LimpezaPageModule = /** @class */ (function () {
    function LimpezaPageModule() {
    }
    LimpezaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LimpezaPage]
        })
    ], LimpezaPageModule);
    return LimpezaPageModule;
}());
export { LimpezaPageModule };
//# sourceMappingURL=limpeza.module.js.map