import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CereaisPage } from './cereais.page';
var routes = [
    {
        path: '',
        component: CereaisPage
    }
];
var CereaisPageModule = /** @class */ (function () {
    function CereaisPageModule() {
    }
    CereaisPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CereaisPage]
        })
    ], CereaisPageModule);
    return CereaisPageModule;
}());
export { CereaisPageModule };
//# sourceMappingURL=cereais.module.js.map