import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.services';

@Component({
  selector: 'app-limpeza',
  templateUrl: './limpeza.page.html',
  styleUrls: ['./limpeza.page.scss'],
})
export class LimpezaPage implements OnInit {

  constructor( private database: DBService) { }

  ngOnInit() {
  }

  async deslogar(){

    try{

      await this.database.deslogar();

      
    }catch(error){
      console.error(error);
    }

  }

}
