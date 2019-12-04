import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/login.guard';
import { CartModalPageModule } from './cart-modal/cart-modal.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate:[LoggedGuard]},
  { path: 'cliente', loadChildren: './cliente/cliente.module#ClientePageModule', canActivate: [AuthGuard] },

  { path: 'listaCliente',
     loadChildren: './lista-cliente/lista-cliente.module#ListaClientePageModule', canActivate: [AuthGuard]},
  
  { path: 'listaProdutos', loadChildren: './lista-produtos/lista-produtos.module#ListaProdutosPageModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' , canActivate: [AuthGuard]},
  { path: 'deslogar', loadChildren: './deslogar/deslogar.module#DeslogarPageModule', canActivate: [AuthGuard] },
  { path: 'carrinho', loadChildren: './carrinho/carrinho.module#CarrinhoPageModule', canActivate: [AuthGuard] },
  { path: 'cadastrar', loadChildren: './cadastrar/cadastrar.module#CadastrarPageModule' },
  { path: 'home2', loadChildren: './home2/home2.module#Home2PageModule' },
  { path: 'cart-modal', loadChildren: './cart-modal/cart-modal.module#CartModalPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules}), CartModalPageModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
