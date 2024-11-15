import { Component } from '@angular/core';

@Component({
  selector: 'app-admit-card-f',
  templateUrl: './admit-card-f.component.html',
  styleUrls: ['./admit-card-f.component.css']
})
export class AdmitCardFComponent {
 profilePicture : String = String(localStorage.getItem('userPic'));
 userName : String = String(localStorage.getItem('userName'));
 userLastName : String = String(localStorage.getItem('userLastName'));
 Roll_No : String = String(localStorage.getItem('rollNo'));
 Student_Id : String = String(localStorage.getItem('studentId'));
  
  
}
