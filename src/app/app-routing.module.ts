import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmitCardFComponent } from './admit-card-f/admit-card-f.component';
import { authGuard } from './auth.guard';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { SemesterRegistrationComponent } from './semester-registration/semester-registration.component';
import { ExamformComponent } from './examform/examform.component';
import { PyqComponent } from './pyq/pyq.component';
import { UploadPaperComponent } from './upload-paper/upload-paper.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { ChatComponent } from './chat/chat.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { UploadNoticeComponent } from './upload-notice/upload-notice.component';
import { GrievanceComponent } from './grievance/grievance.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';
import { SemesterregrequestComponent } from './semesterregrequest/semesterregrequest.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';

const routes: Routes = [
 {
  path: '',
    component: LoginPageComponent,
   },
   {
    path: 'registration',
      component: RegistrationComponent,
     },
     {
     path: 'dashboard',
     component: DashboardComponent,
     canActivate: [authGuard] ,
    },
    {
      path: 'dashboard/admit',
      component: AdmitCardFComponent,
      canActivate: [authGuard] 
     },
     {
      path: 'edit-Password',
      component: EditPasswordComponent,
      canActivate: [authGuard] 
     },
     {
      path: 'semester-Registration',
      component: SemesterRegistrationComponent,
      canActivate: [authGuard] 
     },
     {
      path: 'examform',
      component : ExamformComponent,
      canActivate:[authGuard]
     },
     {
      path: 'previous-year-Question_paper',
      component: PyqComponent,
      canActivate:[authGuard]
     },{
      path: 'upload-paper',
      component: UploadPaperComponent,
     },
     {
      path: 'leave-application',
      component:LeaveApplicationComponent,
      canActivate:[authGuard],
     },
     {
      path: 'chat',
      component:ChatComponent,
      canActivate:[authGuard],
     },
     {
      path:'notice-board',
      component:NoticeBoardComponent,
      canActivate:[authGuard]
     },
     {
      path:'upload-notice',
      component:UploadNoticeComponent,
      canActivate:[authGuard]
     },
     {
      path:'grievance',
      component:GrievanceComponent,
      canActivate:[authGuard]
     },
     {
      path:'forgot-password',
      component:ForgotPasswordComponent,
      // canActivate:[authGuard]
     },
     {
      path:'teacher-dashboard',
      component : TeacherdashboardComponent,
      canActivate:[authGuard]
     },
     {
      path:'semester-request',
      component : SemesterregrequestComponent,
      canActivate:[authGuard]
     },
     {
      path:'student-detail',
      component : StudentdetailComponent,
      canActivate:[authGuard]
     }
     
     
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
