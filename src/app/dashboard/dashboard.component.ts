import { Component ,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
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
