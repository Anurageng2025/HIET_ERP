import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css']
})
export class StudentdetailComponent implements OnInit {

 Students: any[] = [];
  errorMessage: string | null = null;

  constructor(private studentdetailService: AuthService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadNotices();
    
  }

  logout( ) {
    this.studentdetailService.logout();
  }

  formatCustomDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Format day and month with leading zero if necessary
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}-${formattedMonth}-${year}`;
}

  loadNotices(): void {
    this.studentdetailService.studentDetail().subscribe(
      data => {
        this.Students = data;
        console.log(this.Students);
        
          this.Students = data.map(notice => ({
            ...notice,
            date: this.formatCustomDate(new Date(notice.createdAt)) // Format `createdAt` to a readable date
          }));
          if(this.Students.length == 0){
            Swal.fire({
                title: 'Empty',
                text: 'There is no notice available',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
      },
      error => {
        console.error('Error fetching notices:', error);
        this.errorMessage = 'Failed to load Students Detail.';
      }
    );
  }
}


