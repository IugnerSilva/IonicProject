import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CereaisPage } from './cereais.page';

describe('CereaisPage', () => {
  let component: CereaisPage;
  let fixture: ComponentFixture<CereaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CereaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CereaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
