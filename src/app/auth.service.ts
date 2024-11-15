import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';
  private loginUrl = this.apiUrl + 'api/login/' ;
  private registerUrl = this.apiUrl + 'register/';
  private semRegisterUrl = this.apiUrl + 'semesterRegister/';
  private editPasswordUrl = this.apiUrl + 'edit-password/';
  private examRegistrationURL = this.apiUrl + 'examForm';

  private socket = io('http://localhost:3000');

  constructor(private http: HttpClient ,private router :Router) {}

  login(userData: any): Observable<any> {
    return this.http.post(this.loginUrl, userData);
  }
  registerUser(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post<any>(this.registerUrl, userData); 
  }
  private isAuthenticated = false;

   public userdeatil : any = {} ;

  loginToken(token: string , user :any) {
    localStorage.setItem('authToken', token);
    this.isAuthenticated = true;
    this.userdeatil = user;
    localStorage.setItem('userPic',user.profilePictureUrl);
    localStorage.setItem('userName',user.first_name);
    localStorage.setItem('userRole',user.userrole);
    localStorage.setItem('rollNo',user.roll_number);
    localStorage.setItem('studentId',user.student_id);
    localStorage.setItem('email',user.email);
    localStorage.setItem('course',user.course);
    localStorage.setItem('branch',user.branch);
    localStorage.setItem('mobile',user.mobile);
    localStorage.setItem('father_name',user.father_name);
    console.log("User is ....",this.userdeatil);
    
  }

  logout() {
    localStorage.removeItem('father_name');
    localStorage.removeItem('userPic');
    localStorage.removeItem('mobile');
    localStorage.removeItem('branch');
    localStorage.removeItem('course');
    localStorage.removeItem('email');
    localStorage.removeItem('rollNo');
    localStorage.removeItem('studentId');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.router.navigate(["/"]);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('authToken') !== null;
  }
 
  editpassword(userData: any): Observable<any> {
      console.log(userData);
      return this.http.post<any>(this.editPasswordUrl , userData); 
 }
 semesterRegistration(userData: any): Observable<any> {
  console.log(userData);
  return this.http.post<any>(this.semRegisterUrl, userData); 
}

examformRegistration(userData:any): Observable<any> {
  console.log(userData);
  
  return this.http.post<any>(this.examRegistrationURL, userData)
}

getOption(optiondata : any): Observable<any> {
  console.log(optiondata);
  
  return this.http.post<any>(`${this.apiUrl}getoption` , optiondata);
}

getPapers(paperData:any): Observable<any[]> {
  return this.http.post<any[]>(`${this.apiUrl}papers`,paperData);
}

uploadPaper(paperData: any): Observable<any> {
  console.log(paperData.value);
  
  return this.http.post<any>(`${this.apiUrl}papers/upload`, paperData);
}

downloadFile(filename: string): Observable<Blob> {
  return this.http.get(`${this.apiUrl}download/${filename}`, { responseType: 'blob' });
}

joinRoom(data: any) {
  this.socket.emit('joinRoom', data);
}

sendMessage(data: any) {
  this.socket.emit('message', data);
}

receiveMessage(): Observable<any> {
  return new Observable((observer) => {
    this.socket.on('message', (message) => {
      observer.next(message);
    });
  });
}
receivePreviousMessages(): Observable<any[]> {
  return new Observable((observer) => {
    this.socket.on('previousMessages', (messages) => {
      observer.next(messages);
    });
  });
}

uploadNotice(formData: FormData): Observable<any> {
  console.log(formData);
  return this.http.post(`${this.apiUrl}notice/upload`, formData);
}


 // Fetch all notices
 getAllNotices(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}notices`);
}

submitComplaint(complaintData: any): Observable<any> {
  console.log(complaintData);
  
  return this.http.post(`${this.apiUrl}grievance`, complaintData);
}

getComplaints(studentId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}complaints/${studentId}`);
}

requestOtp(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}api/forgot-password`, { email });
}

verifyOtp(email: string, otp: string): Observable<any> {
  return this.http.post(`${this.apiUrl}verify-otp`, { email, otp });
}
resetPassword(username : string ,token: string, newPassword: string): Observable<any> {
  console.log(username , newPassword , token );
   
  return this.http.post(this.editPasswordUrl, {username, newPassword  });
}

getAllSemesterRegistrations(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}api/semester-registration`);
}

studentDetail(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}studentdetail`);
}

}
