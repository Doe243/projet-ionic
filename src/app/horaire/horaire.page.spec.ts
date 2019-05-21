import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairePage } from './horaire.page';

describe('HorairePage', () => {
  let component: HorairePage;
  let fixture: ComponentFixture<HorairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
