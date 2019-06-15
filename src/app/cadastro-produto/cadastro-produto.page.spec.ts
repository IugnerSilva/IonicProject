import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProdutoPage } from './cadastro-produto.page';

describe('CadastroProdutoPage', () => {
  let component: CadastroProdutoPage;
  let fixture: ComponentFixture<CadastroProdutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroProdutoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
