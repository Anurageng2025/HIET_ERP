import { Component  , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registrationForm: FormGroup;
  selectedFiles: File | null = null;
  user_roles = ['Teacher','Student','Director']
  courses = ['B.Tech', 'BCA', 'BBA', 'B.Com'];
  branches = ['Computer Science', 'Mechanical', 'Civil', 'Electrical','Elecronical'];
  branch:String[] = [];
  semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  sem:number[] = [];

  constructor(private fb: FormBuilder ,private userRegistrationService: AuthService,private router : Router,private loadingService: LoadingService) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required,]],
      roll_number: ['', Validators.required],
      student_id: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      first_name: ['', Validators.required],
      userrole: ['', Validators.required],
      dob: ['', Validators.required],
      father_name: ['', Validators.required],
      mother_name: ['', Validators.required],
      parent_mobile: ['', Validators.required],
      gender: ['', Validators.required],
      course: ['', Validators.required],
      branch: ['', Validators.required],
      semester: ['', Validators.required],
      cgpa: ['', Validators.required],
      // agree: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  onFileSelect(event: any,) {
    this.selectedFiles = event.target.files[0];
  }

  Refresh(){
    if(this.registrationForm.get("course")?.value == ""){
      this.branch = [];
      this.sem = [];
    }
    else if(this.registrationForm.get("course")?.value == "B.Tech" && this.registrationForm.get("branch")?.value ==""){
       this.branch = this.branches;
       this.sem = this.semesters;
       this.registrationForm.get("branch")?.enable();
    }
    else if(this.registrationForm.get("course")?.value !== "B.Tech"){
      this.registrationForm.get("branch")?.disable();
      this.sem = [1, 2, 3, 4, 5, 6];
    }else if(this.registrationForm.get("course")?.value === "B.Tech"){
      this.registrationForm.get("branch")?.enable();
      this.branch = this.branches;
      this.sem = this.semesters;
    }
  }

 onSubmit() {
  const formData = new FormData();

  // Append form fields
  for (let key in this.registrationForm.value) {
    formData.append(key, this.registrationForm.get(key)?.value);
  }

  // Append files if they exist
  if (this.selectedFiles) {
    formData.append('profilePicture', this.selectedFiles);
  }
  console.log("Photo -----",this.selectedFiles);
  
  this.loadingService.show();
  // if (this.selectedFiles['signature']) {
  //   formData.append('signature', this.selectedFiles['signature'], this.selectedFiles['signature'].name);
  // }
  

  // Call the service method to register the user
  this.userRegistrationService.registerUser(formData).subscribe({
    next: response => {
      Swal.fire({
        title: 'Registration Successful',
        text: 'Your registration was completed successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Optionally navigate to another route after confirmation
        this.router.navigate(['/']);
        this.loadingService.hide();
      });
    },
    error: error => {
      // Handle error, show an error message
      Swal.fire({
        title: 'Error',
        text: 'There was an error registering the user. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log(error);
      
    }
  });
}
}
