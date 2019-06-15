import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.services';

@Component({
  selector: 'app-deslogar',
  templateUrl: './deslogar.page.html',
  styleUrls: ['./deslogar.page.scss'],
})
export class DeslogarPage implements OnInit {

  constructor(private database: DBService) {

    this.init();
  }


  private async init() {

    try {

      await this.database.deslogar();

    } catch (error) {
      console.error(error);
    }
  }


  ngOnInit() {
  }

}
