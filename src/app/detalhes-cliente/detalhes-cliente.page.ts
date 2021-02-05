import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.page.html',
  styleUrls: ['./detalhes-cliente.page.scss'],
})
export class DetalhesClientePage implements OnInit {

  novoCli: Cliente;
  editingCli: Cliente;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    if (this.editingCli) {
      this.novoCli = this.editingCli;
      
  }
  const updatingObject = {  cpf: this.novoCli.cpf, senha: this.novoCli.senha, nome: this.novoCli.nome,
                            email: this.novoCli.email, rua: this.novoCli.rua, numero: this.novoCli.numero
   };

  
  }

  voltar(){
    this.modalController.dismiss(this.novoCli);
  }
}
