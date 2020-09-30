import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Pedidos } from '../model/pedidos';
import { DBService } from '../services/db.services';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-detalhes-pedidos',
  templateUrl: './detalhes-pedidos.page.html',
  styleUrls: ['./detalhes-pedidos.page.scss'],
})
export class DetalhesPedidosPage implements OnInit {
  
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
