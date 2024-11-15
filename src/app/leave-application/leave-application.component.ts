import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent {
  leaveRequest = {
    studentName: '',
    studentid:String(localStorage.getItem('studentId')),
    Roll_No :String(localStorage.getItem('rollNo')),
    father_name:String(localStorage.getItem('father_name')),
    student_Email : String(localStorage.getItem('email')),
    teacherEmail: '',
    startDate: null as Date | null, // Initialize as null
    endDate: null as Date | null,   // Initialize as null
    reason: '',
    
  };

  logout(){
    this.leaveapplication.logout();
  }

  constructor(private http: HttpClient , private leaveapplication :AuthService,private loadingService:LoadingService ) { }

  onSubmit() {
    if (this.leaveRequest.studentName && this.leaveRequest.teacherEmail && this.leaveRequest.startDate && this.leaveRequest.endDate && this.leaveRequest.reason) {
      console.log('Showing loader');
      this.loadingService.show(); // Show loader
  
      this.http.post('http://localhost:3000/api/leave-application', this.leaveRequest)
        .subscribe({
          next: response => {
            console.log('Leave Application Submitted:', response);
            Swal.fire('Success', 'Leave Application Submitted successfully', 'success');
            this.leaveRequest.studentName = '';
            this.leaveRequest.teacherEmail = '';
            this.leaveRequest.reason = '';
            this.leaveRequest.startDate = null;
            this.leaveRequest.endDate = null;
          },
          error: error => {
            console.error('Error during Submitting:', error);
            Swal.fire('Error', 'Already Submitted or Error', 'error');
          },
          complete: () => {
            console.log('Hiding loader');
            this.loadingService.hide(); // Hide loader when request is complete
          }
        });
    } else {
      Swal.fire('Error', 'You Missed Mandatory Fields', 'error');
    }
  }
  
}
