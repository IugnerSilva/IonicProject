import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/login.guard';

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
  { path: 'cadastrar', loadChildren: './cadastrar/cadastrar.module#CadastrarPageModule'},
  { path: 'pedidos', loadChildren: './pedidos/pedidos.module#PedidosPageModule',canActivate: [AuthGuard] },
  { path: 'pedido-cliente', loadChildren: './pedido-cliente/pedido-cliente.module#PedidoClientePageModule',canActivate: [AuthGuard] },
  { path: 'historico-cliente', loadChildren: './historico-cliente/historico-cliente.module#HistoricoClientePageModule',canActivate: [AuthGuard] },
  { path: 'cadastro-perfil', loadChildren: './cadastro-perfil/cadastro-perfil.module#CadastroPerfilPageModule',canActivate: [AuthGuard] },
  { path: 'cadastro-admin', loadChildren: './cadastro-admin/cadastro-admin.module#CadastroAdminPageModule',canActivate: [AuthGuard] },
  { path: 'lista-admin', loadChildren: './lista-admin/lista-admin.module#ListaAdminPageModule',canActivate: [AuthGuard] },
  { path: 'forma-pagamento', loadChildren: './forma-pagamento/forma-pagamento.module#FormaPagamentoPageModule',canActivate: [AuthGuard] },
  { path: 'historico-detalhes', loadChildren: './historico-detalhes/historico-detalhes.module#HistoricoDetalhesPageModule',canActivate: [AuthGuard] },
  { path: 'historico', loadChildren: './historico/historico.module#HistoricoPageModule',canActivate: [AuthGuard] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
