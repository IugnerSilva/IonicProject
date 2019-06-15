import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetalhesPage } from './detalhes.page';
var routes = [
    {
        path: '',
        component: DetalhesPage
    }
];
var DetalhesPageModule = /** @class */ (function () {
    function DetalhesPageModule() {
    }
    DetalhesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DetalhesPage]
        })
    ], DetalhesPageModule);
    return DetalhesPageModule;
}());
export { DetalhesPageModule };
//# sourceMappingURL=detalhes.module.js.map