import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoClientePage } from './historico-cliente.page';

describe('HistoricoClientePage', () => {
  let component: HistoricoClientePage;
  let fixture: ComponentFixture<HistoricoClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
