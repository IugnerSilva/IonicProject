import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController, NavParams, NavController } from '@ionic/angular';
import { Produto } from '../model/produto';
import { CadastroProdutoPage } from '../cadastro-produto/cadastro-produto.page';
import { DetalhesPage } from '../detalhes/detalhes.page';
import { Categoria } from '../model/categoria';

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

  produtos2: Produto[];
  produtos: Produto[];
  categorias: Categoria[];
  uid: string;
  carregando = true;

  arr3 = [];
  dados: any = [];

  constructor(public router: Router, private database: DBService, public modal: ModalController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, public navCtrl: NavController) {

  }

  async ngOnInit() {

    this.carregando = true;
    await this.carregarProdutos();

    await this.carregarCategorias();
  }

  private carregarCategorias() {

    this.database.listar<Categoria>('/categorias/')
      .then(categorias => {
        this.categorias = categorias;
      }).catch(error => {
        console.log(error);
      });

  }
  private carregarProdutos() {

    this.database.listar<Categoria>('/categorias')
      .then(categorias => {
        this.categorias = categorias;

        for (let cat of this.categorias) {

          this.uid = cat.uid

          this.database.listar<Produto>('/produtos/' + this.uid)
            .then(produtos => {
              this.produtos = produtos;

              for (var i in this.produtos) {
                var shared = false;
                for (var j in this.produtos2)
                  if (this.produtos2[j].nome == this.produtos[i].nome) {
                    shared = true;
                    break;
                  }
                if (!shared) this.arr3.push(this.produtos[i])
              }

            }).catch(error => {
              console.log(error);
            });

        }
      }).catch(error => {
        console.log(error);
      });
  }

  remove(uid: string) {
    this.database.listar<Categoria>('/categorias')
      .then(categorias => {
        this.categorias = categorias;

        for (let cat of this.categorias) {

          this.uid = cat.uid
          this.database.listar<Produto>('/produtos/' + this.uid)
            .then(produtos => {
              this.produtos = produtos;
              for (let produto of this.produtos) {
                if (uid == produto.uid) {
                  this.database.remover('/produtos/' + produto.categoriaId, uid)
                    .then(async () => {
                      await location.reload();

                      this.presentToast('Produto removido com sucesso !');
                    });
                }
              }
            }).catch(error => {
              console.log(error);
            });
        }
      }).catch(error => {
        console.log(error);
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

    return await modal.present();
  }

  private confirmAdd() {
    location.reload();

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

    return await modal.present();
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

    return await modal.present();
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


  filtrar(ev: any) {

    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.bebidas = this.bebidas.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if (val && val.trim() != '') {
      this.limpeza = this.limpeza.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if (val && val.trim() != '') {
      this.alimentos = this.alimentos.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else { this.carregarProdutos(); }

  }


}
