import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController, NavParams, NavController } from '@ionic/angular';
import { Produto } from '../model/produto';
import { CadastroProdutoPage } from '../cadastro-produto/cadastro-produto.page';
import { DetalhesPage } from '../detalhes/detalhes.page';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {
  loading: any;
  bebidas: Produto[];
  alimentos: Produto[];
  limpeza: Produto[];
  produtos: Produto[];
  uid : string;
  carregando = true;
  
  dados: any=[];

  constructor(public router: Router,private database: DBService,public modal: ModalController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, public navCtrl: NavController) { 

  }
 
  async ngOnInit() {
    
    this.carregando = true;
    await this.carregarProdutos();
    
  }

  private carregarProdutos(){
    this.carregarAlimentos();
    this.carregarLimpeza();
    this.carregarBebidas();
  }

  
  private async carregarBebidas() {
    //await this.presentLoading();
    
    
    this.database.listar<Produto>('/produtos/bebidas')
      .then(bebidas => {
        this.bebidas = bebidas;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }
  private async carregarAlimentos() {
    this.database.listar<Produto>('/produtos/alimentos')
      .then(alimentos => {
        this.alimentos = alimentos;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }
  private async carregarLimpeza() {
    this.database.listar<Produto>('/produtos/limpeza')
      .then(limpeza => {
        this.limpeza = limpeza;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  remove(uid: string) {
    this.database.remover('/produtos', uid)
      .then(() => {
        this.presentToast('Produto removido com sucesso !');
        this.carregarProdutos();
      });
    }

  async add() {
    const modal = await this.modal.create({
      component: CadastroProdutoPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
          
        }
      });

    return  await modal.present();
  }

  private confirmAdd() {
    this.presentToast('Produto adicionado com sucesso');
    this.carregarProdutos();
    
  }
  async editar(produtos: Produto) {
    const modal = await this.modal.create({
      component: CadastroProdutoPage,
      componentProps: {
        editingProdutos: produtos
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {

        }
      });

    return  await modal.present();
  }
  
  async detalhes(produtos: Produto) {
    const modal = await this.modal.create({
      component: DetalhesPage,
      componentProps: {
        editingProdutos: produtos
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {

        }
      });

    return  await modal.present();
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor,aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  novo() {
    this.router.navigate(['/cadastroProduto'])
  }

  
  filtrar(ev:any){

    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.bebidas = this.bebidas.filter((item)=>{
        return(item.nome.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
    if(val && val.trim() != ''){
      this.limpeza = this.limpeza.filter((item)=>{
        return(item.nome.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
    if(val && val.trim() != ''){
      this.alimentos = this.alimentos.filter((item)=>{
        return(item.nome.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }else {this.carregarProdutos();}

  }


}
