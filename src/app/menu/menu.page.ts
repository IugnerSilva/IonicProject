import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { DBService } from '../services/db.services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [{

    title: 'Início',
    url: '/menu/home'
  },{

    title: 'Limpeza',
    url: '/menu/limpeza'
  },

  {
    title: 'Cereais',
    url: '/menu/cereais'

  }, {

    title: 'Lista de Clientes',
    url: '/menu/listaCliente'

  },{

    title: 'Sair',
    url: '/menu/deslogar'

  }
  ];

  selectedPath = '';

  constructor(private router: Router, private database: DBService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })
  }

  

  ngOnInit() {
  }

}
