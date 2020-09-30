import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdminPage } from './lista-admin.page';

describe('ListaAdminPage', () => {
  let component: ListaAdminPage;
  let fixture: ComponentFixture<ListaAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
