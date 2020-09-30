import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoClientePage } from './pedido-cliente.page';

describe('PedidoClientePage', () => {
  let component: PedidoClientePage;
  let fixture: ComponentFixture<PedidoClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
