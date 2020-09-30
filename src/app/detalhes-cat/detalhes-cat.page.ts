import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-cat',
  templateUrl: './detalhes-cat.page.html',
  styleUrls: ['./detalhes-cat.page.scss'],
})
export class DetalhesCatPage implements OnInit {
  
  produtos: Produto;
  
  novoProduto: Produto;
  editingProdutos: Produto;
  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,public modalController: ModalController,) { 
     
    this.novoProduto = new Produto(); 
      

}
  ngOnInit() {
    if (this.editingProdutos) {
      this.novoProduto = this.editingProdutos;
      
  }
  const updatingObject = {  foto: this.novoProduto.foto, preco: this.novoProduto.preco, nome: this.novoProduto.nome,
    descricao: this.novoProduto.descricao, categoriaId: this.novoProduto.categoriaId
   };

  
  }

  voltar(){
    this.modalController.dismiss(this.novoProduto);
  }
 

}
