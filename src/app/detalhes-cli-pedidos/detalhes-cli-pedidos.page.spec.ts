import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCliPedidosPage } from './detalhes-cli-pedidos.page';

describe('DetalhesCliPedidosPage', () => {
  let component: DetalhesCliPedidosPage;
  let fixture: ComponentFixture<DetalhesCliPedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesCliPedidosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesCliPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
