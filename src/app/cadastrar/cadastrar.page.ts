import { Component, OnInit } from '@angular/core';
import { CadastroPage } from '../cadastro/cadastro.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  constructor(
    public modalController: ModalController,) { }

  async ngOnInit() {
      const modal = await this.modalController.create({
        component: CadastroPage,
        componentProps: {
        }
      });
      modal.onDidDismiss()
      
    return  await modal.present();
  
  }

}
