import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-upload-paper',
  templateUrl: './upload-paper.component.html',
  styleUrls: ['./upload-paper.component.css']
})
export class UploadPaperComponent {
  selectedFile: File | null = null;
  selectedFileName: string = '';
  courses = ['B.Tech' , 'BCA ' ,'MCA'];
  semesters = ['1st' , '2nd' ,'3rd' ,'4th', '5th', '6th', '7th', '8th'];
  course: string = '';
  semester: string = '';
  year: string = '';

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const label = input.closest('label');
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      if (label) {
        label.classList.add('file-selected');
      }
    } else {
      if (label) {
        label.classList.remove('file-selected');
      }
    }
  }

  constructor(
    private paperService: AuthService
  ) {}

 onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  logout(){
    this.paperService.logout();
  }

  onSubmit(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('pdf', this.selectedFile); // Ensure 'pdf' matches your backend field name
    }
    formData.append('course', this.course);
    formData.append('semester', this.semester);
    formData.append('year', this.year);

    console.log(formData);

    this.paperService.uploadPaper(formData).subscribe({
      next: (response) => {
        console.log('Upload successful', response);
      },
      error: (error) => {
        console.error('Upload failed', error);
      }
    });
  }


  onNoClick(): void {
    // this.dialogRef.close();
  }
}
