import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { response } from 'express';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-grievance',
  templateUrl: './grievance.component.html',
  styleUrls: ['./grievance.component.css']
})
export class GrievanceComponent implements OnInit {
  grievanceForm: FormGroup;
  mycomplaintsVisible = false;
  complaints: any[] = [];
  student_Id: string | null = localStorage.getItem('studentId');

  constructor(private fb: FormBuilder, private grievanceService: AuthService) {
    this.grievanceForm = this.fb.group({
      student_Id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      complaint: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.grievanceForm = this.fb.group({
      student_Id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      complaint: ['', Validators.required]
    });

    this.grievanceForm.patchValue({
      student_Id : localStorage.getItem('studentId'),
      email : localStorage.getItem('email') ,
    })
  }

  get f() {
    return this.grievanceForm.controls;
  }

  logout(){
    this.grievanceService.logout();
  }

  toggleComplaints(): void {
    this.mycomplaintsVisible = !this.mycomplaintsVisible;
    if (this.mycomplaintsVisible && this.student_Id) {
      this.grievanceService.getComplaints(this.student_Id).subscribe(
        response => {
          this.complaints = response;
        },
        error => {
          console.error('Error retrieving complaints:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.grievanceForm.valid) {
      this.grievanceService.submitComplaint(this.grievanceForm.value).subscribe(
        response => {
          console.log('Complaint submitted successfully:', response);
          Swal.fire('Success', 'Complaint submitted successfully', 'success')
          this.grievanceForm.reset();
        },
        error => {
          console.error('Error submitting complaint:', error);
        }
      );
    }
  }
}
