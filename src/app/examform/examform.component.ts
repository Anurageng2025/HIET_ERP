import { Component , OnInit } from '@angular/core';
import { FormGroup ,FormBuilder ,Validators ,FormArray} from '@angular/forms';
import { AuthService } from '../auth.service';
import { response } from 'express';
import Swal from 'sweetalert2';
import { LoadingService } from '../loading.service';


@Component({
  selector: 'app-examform',
  templateUrl: './examform.component.html',
  styleUrls: ['./examform.component.scss']
})
export class ExamformComponent implements OnInit  {
  ExamForm: FormGroup;
  // selectedFiles: File | null = null;
  courses = ['B.Tech', 'BCA', 'BBA', 'B.Com'];
  branches = ['Computer Science', 'Mechanical', 'Civil', 'Electrical','Elecronical'];
  availableSubjects: string[] = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

  branch:String[] = [];
  semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  sem:number[] = [];

  constructor(private fb:FormBuilder ,private examform : AuthService,private loader:LoadingService){
     this.ExamForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]],
      roll_number: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]],
      student_id: ['', [Validators.required]],
      first_name: [''],
      last_name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      father_name: ['', [Validators.required]],
      // mother_name: ['', [Validators.required]],
      // parent_mobile: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]],
      aadhar_card: ['', [Validators.required]],
      blood_group: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      course: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      cgpa: ['', [Validators.required]],
      profile_picture: [null],
      subjects: this.fb.array([this.createSubjectFormGroup()])
     })
     this.ExamForm.patchValue({
      email : this.examform.userdeatil.email ,
      first_name : this.examform.userdeatil.first_name
    })
  }

  createSubjectFormGroup(): FormGroup {
    return this.fb.group({
      subject: ['', Validators.required]
    });
  }

  get subjects(): FormArray {
    return this.ExamForm.get('subjects') as FormArray;
  }

  addSubjectField(): void {
    this.subjects.push(this.createSubjectFormGroup());
  }

  removeSubjectField(index: number): void {
    if (this.subjects.length > 1) {
      this.subjects.removeAt(index);
    }
  }

  // onFileSelect(event: any,) {
  //   this.selectedFiles = event.target.files[0];
  // }

  logout(){
    this.examform.logout();
  }

  Refresh(){
    if(this.ExamForm.get("course")?.value == ""){
      this.branch = [];
      this.sem = [];
    }
    else if(this.ExamForm.get("course")?.value == "B.Tech" && this.ExamForm.get("branch")?.value ==""){
       this.branch = this.branches;
       this.sem = this.semesters;
       this.ExamForm.get("branch")?.enable();
    }
    
    else if(this.ExamForm.get("course")?.value !== "B.Tech"){
      this.ExamForm.get("branch")?.disable();
      this.sem = [1, 2, 3, 4, 5, 6];
    }else if(this.ExamForm.get("course")?.value === "B.Tech"){
      this.ExamForm.get("branch")?.enable();
      this.branch = this.branches;
      this.sem = this.semesters;
    }
  }

  onSubmit(){
    // console.log(this.ExamForm.value);
    const formData = this.ExamForm.value;
    formData.subjects = JSON.stringify(this.subjects.controls.map(subject => subject.value.subject));
    console.log(formData);
    
    // const formData = new FormData();
    // for(let key in this.ExamForm.value){
    //   formData.append(key , this.ExamForm.value[key]);
    // }
    // if(this.selectedFiles) {
    //   formData.append('result', this.selectedFiles)
    // }

    this.loader.show();
    
    this.examform.examformRegistration(formData).subscribe({
      next: response => {
        console.log('Exam Form Submitted:', response);
        this.loader.hide();
        Swal.fire('Success', 'Exam Form Submitted successfully', 'success');
      },
      error: error => {
        console.error('Error Exam Form Submitted:', error);
        this.loader.hide();
        Swal.fire('Error', 'Already Submitted or Error', 'error');
      }
    });
  }

  ngOnInit(): void {
  console.log("local" , this.examform.userdeatil);
      this.ExamForm.patchValue({
        email : localStorage.getItem('email') ,
        first_name : localStorage.getItem('userName'),
        last_name : localStorage.getItem('userLastName'),
        roll_number : localStorage.getItem('rollNo'),
        student_id : localStorage.getItem('studentId'),
        mobile : (localStorage.getItem('mobile')),
        father_name : (localStorage.getItem('father_name')),
        course : (localStorage.getItem('course')),
        branch : (localStorage.getItem('branch')),
      })
    
  }


}
