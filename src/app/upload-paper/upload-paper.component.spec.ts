import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPaperComponent } from './upload-paper.component';

describe('UploadPaperComponent', () => {
  let component: UploadPaperComponent;
  let fixture: ComponentFixture<UploadPaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPaperComponent]
    });
    fixture = TestBed.createComponent(UploadPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
