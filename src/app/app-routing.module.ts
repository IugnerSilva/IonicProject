import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { AuthGuard } from './guards/auth.guard';
//import { LoggedGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'}, /*canActivate:[LoggedGuard]*/ 
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'cliente', loadChildren: './cliente/cliente.module#ClientePageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule'},/* canActivate: [AuthGuard]*/ 

  { path: 'listaCliente',
     loadChildren: './lista-cliente/lista-cliente.module#ListaClientePageModule', },/*canActivate: [AuthGuard]*/
     
  { path: 'cadastroProduto', 
      loadChildren: './cadastro-produto/cadastro-produto.module#CadastroProdutoPageModule'},/*canActivate: [AuthGuard]  */

  { path: 'listaProdutos', loadChildren: './lista-produtos/lista-produtos.module#ListaProdutosPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'detalhes/:id', loadChildren: './detalhes/detalhes.module#DetalhesPageModule' },
  { path: 'deslogar', loadChildren: './deslogar/deslogar.module#DeslogarPageModule' },
  { path: 'carrinho', loadChildren: './carrinho/carrinho.module#CarrinhoPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
