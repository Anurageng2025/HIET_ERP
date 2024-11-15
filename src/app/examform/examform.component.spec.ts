import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamformComponent } from './examform.component';

describe('ExamformComponent', () => {
  let component: ExamformComponent;
  let fixture: ComponentFixture<ExamformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamformComponent]
    });
    fixture = TestBed.createComponent(ExamformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
