import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
//import { AuthGuard } from './guards/auth.guard';
//import { LoggedGuard } from './guards/login.guard';
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
    { path: 'cliente', loadChildren: './cliente/cliente.module#ClientePageModule' },
    { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
    { path: 'listaCliente',
        loadChildren: './lista-cliente/lista-cliente.module#ListaClientePageModule', },
    { path: 'cadastroProduto',
        loadChildren: './cadastro-produto/cadastro-produto.module#CadastroProdutoPageModule' },
    { path: 'listaProdutos', loadChildren: './lista-produtos/lista-produtos.module#ListaProdutosPageModule' },
    // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'detalhes/:id', loadChildren: './detalhes/detalhes.module#DetalhesPageModule' },
    { path: 'deslogar', loadChildren: './deslogar/deslogar.module#DeslogarPageModule' },
    { path: 'carrinho', loadChildren: './carrinho/carrinho.module#CarrinhoPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map