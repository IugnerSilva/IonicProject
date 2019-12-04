
import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/carrinho.services';
import { Carrinho } from '../model/carrinho';
import { LoadingController, ToastController } from '@ionic/angular';
import { Produto } from '../model/produto';
import { DBService } from '../services/db.services';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
 
@Component({
  selector: 'app-cart',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
 
  selectedItems = [];
  
  clientes: Cliente[];
  carregando = true;
  private loading: any;
  novoCarrinho: Carrinho;
  carrinho: CarrinhoPage[];
  total = 0;
 
  constructor(private cartService: CarService, private loadingCtrl: LoadingController,
              private toastCtrl: ToastController, private database: DBService,public router: Router) {
                
    this.novoCarrinho = new Carrinho(); 
    }
  ngOnInit() {
    let items = this.cartService.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.uid]) {
        selected[obj.uid].quantidade++;
      } else {
        selected[obj.uid] = {...obj, quantidade: 1};
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key])
    this.total = this.selectedItems.reduce((a, b) => a + (b.quantidade * b.preco), 0);
    this.carregarClientes()
  }

  
  async comprar() {
    await this.presentLoading();
    this.database.inserir('carrinho', this.selectedItems)
      .then(() => {

        this.presentToast('Produto solicitado com sucesso !');
        this.router.navigate(['/home'])
        this.novoCarrinho = new Carrinho();
        this.loading.dismiss();
        

      });
  }

  private async carregarClientes() {
    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde ...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1000 });
    toast.present();
  }


 
}