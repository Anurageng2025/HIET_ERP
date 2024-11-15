import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNoticeComponent } from './upload-notice.component';

describe('UploadNoticeComponent', () => {
  let component: UploadNoticeComponent;
  let fixture: ComponentFixture<UploadNoticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadNoticeComponent]
    });
    fixture = TestBed.createComponent(UploadNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
