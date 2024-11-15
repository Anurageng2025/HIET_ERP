import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit {
  notices: any[] = [];
  errorMessage: string | null = null;

  constructor(private noticeService: AuthService) { }

  ngOnInit(): void {
    this.loadNotices();
    
  }

  logout( ) {
    this.noticeService.logout();
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
    this.noticeService.getAllNotices().subscribe(
      data => {
        this.notices = data;
          this.notices = data.map(notice => ({
            ...notice,
            date: this.formatCustomDate(new Date(notice.createdAt)) // Format `createdAt` to a readable date
          }));
          if(this.notices.length == 0){
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
        this.errorMessage = 'Failed to load notices.';
      }
    );
  }
}

