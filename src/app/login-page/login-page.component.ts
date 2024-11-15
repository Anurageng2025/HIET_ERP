import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup ,FormBuilder,Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from '../loading.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})




export class LoginPageComponent {
  username: string = '';
  password: string = '';
  userrole: string = '';

  loginForm : FormGroup;

  constructor(private spinner: NgxSpinnerService ,private fb: FormBuilder ,private authService: AuthService ,private router: Router,private loadingService: LoadingService) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userrole: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.loadingService.show();
    
    this.authService.login(this.loginForm.value)
      .subscribe({  next: response => {
        console.log('User registered:', response);
        // Handle successful response
        this.authService.loginToken(response.token , response.userd);
        if(response.userd.userrole === 'Student'){
        this.router.navigate(['/dashboard']);}
        else{
          console.log("Teacher logined");
          this.router.navigate(['/teacher-dashboard']);
          
        }
        this.loadingService.hide();
      },
      error: error => {
        console.error('Error registering user:', error);
        Swal.fire({
          title: 'Login Error',
          text: 'Invalid credentials. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        // Handle error, perhaps notify the user or log the error 
      }});
  }
}