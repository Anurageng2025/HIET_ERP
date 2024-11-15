import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterRegistrationComponent } from './semester-registration.component';

describe('SemesterRegistrationComponent', () => {
  let component: SemesterRegistrationComponent;
  let fixture: ComponentFixture<SemesterRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemesterRegistrationComponent]
    });
    fixture = TestBed.createComponent(SemesterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
