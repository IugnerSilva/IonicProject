import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeslogarPage } from './deslogar.page';

describe('DeslogarPage', () => {
  let component: DeslogarPage;
  let fixture: ComponentFixture<DeslogarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeslogarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeslogarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
