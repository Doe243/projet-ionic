import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { ItinerairePage } from './itineraire.page';

describe('ItinerairePage', () => {
  let component: ItinerairePage;
  let fixture: ComponentFixture<ItinerairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItinerairePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
