import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  resetToken: string = '';
  message: string = '';

  constructor(private forgotPasswordService: AuthService, private router:Router) {}

  requestOtp() {
    this.forgotPasswordService.requestOtp(this.email).subscribe(response => {
      this.message = 'OTP sent to your email';
    }, error => {
      this.message = 'Error sending OTP';
    });
  }

  verifyOtp() {
    this.forgotPasswordService.verifyOtp(this.email, this.otp).subscribe(response => {
      this.resetToken = response.resetToken; // Save the reset token for later use
      this.message = 'OTP verified. Please enter your new password.';
    }, error => {
      this.message = 'Invalid OTP';
      Swal.fire({
        title: 'OTP Error',
        text: 'Invalid OTP',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

  logout(){
    this.forgotPasswordService.logout();
  }

  resetPassword() {
    if (this.newPassword === this.confirmNewPassword) {
      this.forgotPasswordService.resetPassword(this.email, this.resetToken, this.newPassword).subscribe(response => {
        this.message = 'Password reset successfully';
        Swal.fire('Success', 'Password has been reset successfully', 'success').then( ()=> {
          this.router.navigate(['/']);
        });

      }, error => {
        this.message = 'Error resetting password';
        Swal.fire({
          title: 'Edit Password Error',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    } else {
      this.message = 'Passwords do not match';
    }
  }
}
