import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.css']
})
export class TeacherdashboardComponent {

  userName:String = "" ;
  profilePicture : String = "";
  constructor(private authService: AuthService ,private router: Router){
          this.userName  = this.authService.userdeatil.first_name;
          this.profilePicture = this.authService.userdeatil.profilePictureUrl;
  }

  // user= this.authService.userdeatil.first_name; 

  logout(){
    this.authService.logout();
    
  }
  navigateToEditPassword(route:String){
    this.router.navigate([route]);
  }
  ngOnInit() { 
    this.profilePicture = String(localStorage.getItem('userPic'));
    this.userName = String(localStorage.getItem('userName'));
    console.log( "this is local variable  :- ",localStorage.getItem('user') );
} 

}


