import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AroundMePage } from './around-me.page';

describe('AroundMePage', () => {
  let component: AroundMePage;
  let fixture: ComponentFixture<AroundMePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AroundMePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AroundMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
