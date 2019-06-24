import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/carrinho.services';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
  providers:[CarService]
})
export class CarrinhoPage implements OnInit {

  selectedItems = [];
  total = 0;


  constructor(private carService: CarService) { }

  ngOnInit() {

    let items = this.carService.getCart();
    console.log(items)
    let selected = {};

    for (let obj of items) {
      if (selected[obj.uid]) {
        selected[obj.uid].count++;
      } else {
        selected[obj.uid] = {...obj, count: 1 };

      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key])
    console.log('items: ', this.selectedItems);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.preco), 0);
  }
}


