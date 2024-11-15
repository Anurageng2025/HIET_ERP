import { Component } from '@angular/core';
import { FormGroup ,FormBuilder ,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { response } from 'express';
import Swal from 'sweetalert2';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-semester-registration',
  templateUrl: './semester-registration.component.html',
  styleUrls: ['./semester-registration.component.scss']
})
export class SemesterRegistrationComponent {

  semesterRegistrationForm: FormGroup;
  selectedFiles: File | null = null;
  courses = ['B.Tech', 'BCA', 'BBA', 'B.Com'];
  branches = ['Computer Science', 'Mechanical', 'Civil', 'Electrical','Elecronical'];
  branch:String[] = [];
  semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  sem:number[] = [];

  constructor(private fb:FormBuilder ,private semesterregister : AuthService,private loader:LoadingService){
     this.semesterRegistrationForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]],
      roll_number: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]],
      student_id: ['', [Validators.required]],
      first_name: [''],
      last_name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      father_name: ['', [Validators.required]],
      mother_name: ['', [Validators.required]],
      parent_mobile: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]],
      aadhar_card: ['', [Validators.required]],
      blood_group: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      course: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      cgpa: ['', [Validators.required]],
      profile_picture: [null]
     })
     
     this.semesterRegistrationForm.patchValue({
      email : localStorage.getItem('email') ,
      first_name : localStorage.getItem('userName'),
      last_name : localStorage.getItem('userLastName'),
      roll_number : localStorage.getItem('rollNo'),
      student_id : localStorage.getItem('studentId'),
      mobile : (localStorage.getItem('mobile')),
      father_name : (localStorage.getItem('father_name')),
      course : (localStorage.getItem('course')),
      branch : (localStorage.getItem('branch')),
    })

  }

  onFileSelect(event: any,) {
    this.selectedFiles = event.target.files[0];
  }

  logout(){
    this.semesterregister.logout();
  }

  Refresh(){
    if(this.semesterRegistrationForm.get("course")?.value == ""){
      this.branch = [];
      this.sem = [];
    }
    else if(this.semesterRegistrationForm.get("course")?.value == "B.Tech" && this.semesterRegistrationForm.get("branch")?.value ==""){
       this.branch = this.branches;
       this.sem = this.semesters;
       this.semesterRegistrationForm.get("branch")?.enable();
    }
    else if(this.semesterRegistrationForm.get("course")?.value !== "B.Tech"){
      this.semesterRegistrationForm.get("branch")?.disable();
      this.sem = [1, 2, 3, 4, 5, 6];
    }else if(this.semesterRegistrationForm.get("course")?.value === "B.Tech"){
      this.semesterRegistrationForm.get("branch")?.enable();
      this.branch = this.branches;
      this.sem = this.semesters;
    }
  }

  onSubmit() {
    console.log(this.semesterRegistrationForm.value);
    
    const formData = new FormData();
    
    // Appending form values to FormData
    for (let key in this.semesterRegistrationForm.value) {
      formData.append(key, this.semesterRegistrationForm.value[key]);
    }
  
    // If there are selected files, append them to FormData
    if (this.selectedFiles) {
      formData.append('result', this.selectedFiles);
    }
  
    // Show loader before initiating the request
    this.loader.show();
  
    // Make the HTTP request
    this.semesterregister.semesterRegistration(formData).subscribe({
      next: response => {
        console.log('Hiding loader');
        this.loader.hide();
        console.log('Semester registration:', response);
        Swal.fire('Success', 'Semester registration successful', 'success');
      },
      error: error => {
          console.log('Hiding loader');
          this.loader.hide();
        console.error('Semester registration failed:', error);
        Swal.fire('Error', 'Failed to register user', 'error');
      }
    });
    
  }
  
}
