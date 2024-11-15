import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyqComponent } from './pyq.component';

describe('PyqComponent', () => {
  let component: PyqComponent;
  let fixture: ComponentFixture<PyqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PyqComponent]
    });
    fixture = TestBed.createComponent(PyqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
