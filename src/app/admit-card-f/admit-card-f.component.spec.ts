import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitCardFComponent } from './admit-card-f.component';

describe('AdmitCardFComponent', () => {
  let component: AdmitCardFComponent;
  let fixture: ComponentFixture<AdmitCardFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmitCardFComponent]
    });
    fixture = TestBed.createComponent(AdmitCardFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
