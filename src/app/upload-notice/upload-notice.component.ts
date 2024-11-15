import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust import path if needed
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-notice',
  templateUrl: './upload-notice.component.html',
  styleUrls: ['./upload-notice.component.css']
})
export class UploadNoticeComponent {
  noticeForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private noticeService: AuthService
  ) {
    this.noticeForm = this.fb.group({
      title: ['', Validators.required],
      course: ['', Validators.required],
      semester: ['', Validators.required],
      year: ['', Validators.required],
      pdf: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.noticeForm.patchValue({
        pdf: file
      });
      this.noticeForm.get('pdf')?.updateValueAndValidity();
    }
  }

  logout(){
    this.noticeService.logout();
  }

  onSubmit() {
    if (this.noticeForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.noticeForm.get('title')?.value);
    formData.append('course', this.noticeForm.get('course')?.value);
    formData.append('semester', this.noticeForm.get('semester')?.value);
    formData.append('year', this.noticeForm.get('year')?.value);
    formData.append('pdf', this.noticeForm.get('pdf')?.value);

    this.noticeService.uploadNotice(formData).subscribe(
      response => {
        this.message = 'Notice uploaded successfully!';
        console.log(this.message);
        // Swal.fire('success' , 'Notice uploaded successfully!' , 'success')
        Swal.fire({
          title: 'Uploaded ',
          text: 'Notice Uploaded Successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.noticeForm.reset();
        
      },
      error => {
        console.error('Error uploading notice:', error);
        this.message = 'Failed to upload notice.';
        Swal.fire({
          title: 'Error',
          text: 'There was an error while uploading notice . Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
