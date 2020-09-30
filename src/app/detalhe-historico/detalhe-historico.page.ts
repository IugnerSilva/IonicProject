import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Pedidos } from '../model/pedidos';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DBService } from '../services/db.services';

@Component({
  selector: 'app-detalhe-historico',
  templateUrl: './detalhe-historico.page.html',
  styleUrls: ['./detalhe-historico.page.scss'],
})
export class DetalheHistoricoPage implements OnInit {
  
  uid: Cliente;
  novoUid: Cliente;
  editingPedidos: Cliente;
  
  pedidos: Pedidos[];
  total = 0;

  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,public modalController: ModalController,private database: DBService) { 
     
    this.uid = new Cliente(); 
  
}
  ngOnInit() {
        
  
    if (this.editingPedidos) {
      this.novoUid = this.editingPedidos;
      
  
  this.database.listar<Pedidos>('/pedidos/'+this.novoUid)
  .then(pedidos => {
    this.pedidos = pedidos;
    console.log("uiduiduid"+this.novoUid)
    for(let p of this.pedidos){
    
    }
    console.log(this.pedidos);

    
this.total = this.pedidos.reduce((a, b) => a + (b.amount * b.preco), 0);
    
  }).catch(error => {
    console.log(error);
  });

  }
}

  voltar(){
    this.modalController.dismiss(this.novoUid);
  }
 

}
