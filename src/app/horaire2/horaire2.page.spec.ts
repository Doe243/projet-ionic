import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Horaire2Page } from './horaire2.page';

describe('Horaire2Page', () => {
  let component: Horaire2Page;
  let fixture: ComponentFixture<Horaire2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Horaire2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Horaire2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
