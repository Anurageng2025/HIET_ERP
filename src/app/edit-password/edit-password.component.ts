import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent {
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.changePasswordForm = this.fb.group({
      username: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.changePasswordForm.patchValue({
      username : localStorage.getItem('email') ,
    })
  }

  editPassword() {
    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const confirmNewPassword = this.changePasswordForm.get('confirmNewPassword')?.value;

      if (newPassword === confirmNewPassword) {
        this.authService.editpassword(this.changePasswordForm.value).subscribe({
          next: () => {
            console.log("Password edited successfully");
            Swal.fire('Success', 'Password has been reset successfully', 'success');
            this.authService.logout();
          },
          error: error => {
            console.error('Error editing password:', error);
            Swal.fire({
              title: 'Edit Password Error',
              text: 'Something went wrong. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Confirmation Error',
          text: 'Confirm Password must match the New Password',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please ensure all fields are filled correctly.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}
