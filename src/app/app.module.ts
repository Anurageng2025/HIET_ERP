import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmitCardFComponent } from './admit-card-f/admit-card-f.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { SemesterRegistrationComponent } from './semester-registration/semester-registration.component';
import { ExamformComponent } from './examform/examform.component';
import { PyqComponent } from './pyq/pyq.component';
import { UploadPaperComponent } from './upload-paper/upload-paper.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { ChatComponent } from './chat/chat.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { UploadNoticeComponent } from './upload-notice/upload-notice.component';
import { GrievanceComponent } from './grievance/grievance.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';
import { SemesterregrequestComponent } from './semesterregrequest/semesterregrequest.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationComponent,
    DashboardComponent,
    AdmitCardFComponent,
    EditPasswordComponent,
    SemesterRegistrationComponent,
    ExamformComponent,
    PyqComponent,
    UploadPaperComponent,
    SafeUrlPipe,
    LeaveApplicationComponent,
    ChatComponent,
    NoticeBoardComponent,
    UploadNoticeComponent,
    GrievanceComponent,
    ForgotPasswordComponent,
    TeacherdashboardComponent,
    SemesterregrequestComponent,
    StudentdetailComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
