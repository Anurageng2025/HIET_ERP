import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterregrequestComponent } from './semesterregrequest.component';

describe('SemesterregrequestComponent', () => {
  let component: SemesterregrequestComponent;
  let fixture: ComponentFixture<SemesterregrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemesterregrequestComponent]
    });
    fixture = TestBed.createComponent(SemesterregrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
