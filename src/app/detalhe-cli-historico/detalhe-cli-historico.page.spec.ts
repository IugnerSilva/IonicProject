import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheCliHistoricoPage } from './detalhe-cli-historico.page';

describe('DetalheCliHistoricoPage', () => {
  let component: DetalheCliHistoricoPage;
  let fixture: ComponentFixture<DetalheCliHistoricoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheCliHistoricoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheCliHistoricoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
