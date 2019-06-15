import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DeslogarPage } from './deslogar.page';
var routes = [
    {
        path: '',
        component: DeslogarPage
    }
];
var DeslogarPageModule = /** @class */ (function () {
    function DeslogarPageModule() {
    }
    DeslogarPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DeslogarPage]
        })
    ], DeslogarPageModule);
    return DeslogarPageModule;
}());
export { DeslogarPageModule };
//# sourceMappingURL=deslogar.module.js.map