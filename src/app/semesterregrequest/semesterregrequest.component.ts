import { Component ,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-semesterregrequest',
  templateUrl: './semesterregrequest.component.html',
  styleUrls: ['./semesterregrequest.component.css']
})
export class SemesterregrequestComponent {
  semesterRegistrations: any[] = [];
  errorMessage: string = '';

  constructor(private semesterRegistrationService: AuthService) { }

  ngOnInit(): void {
    // Fetch the data when the component initializes
    this.getSemesterRegistrations();
  }

  // Fetch all semester registrations
  getSemesterRegistrations(): void {
    this.semesterRegistrationService.getAllSemesterRegistrations().subscribe(
      (data) => {
        this.semesterRegistrations = data;
        console.log(this.semesterRegistrations);
        
      },
      (error) => {
        this.errorMessage = 'Failed to load semester registrations.';
        console.error('Error fetching data:', error);
      }
    );
  }

  logout(){
    this.semesterRegistrationService.logout();
  }
  // Approve student
  approveStudent(student: any): void {
    // API call to approve the student can go here
    Swal.fire({
      title: 'Approved!',
      text: `${student.name}'s exam form has been approved.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
    // Optionally, update the student's approval status here
  }

  // Reject student
  rejectStudent(student: any): void {
    // API call to reject the student can go here
    Swal.fire({
      title: 'Rejected!',
      text: `${student.name}'s exam form has been rejected.`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
    // Optionally, update the student's rejection status here
  }

}
