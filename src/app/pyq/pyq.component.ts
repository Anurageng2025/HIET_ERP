import { Component , OnInit} from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-pyq',
  templateUrl: './pyq.component.html',
  styleUrls: ['./pyq.component.css']
})
export class PyqComponent implements OnInit{
  pdfFiles: any[] = [];
  courses : any[]=['B.Tech' ,'BCA' ,'MCA'];
  slectedCourse = '';
  semesters : any[]=[];
  selectedSemester = '';
  years : any[]=[];
  slectedYear = '';
  heading='Previous Year Question Paper ';

  constructor(private previousyear : AuthService){
         
  }

  logout(){
    this.previousyear.logout();
  }
  ngOnInit(): void {
    // this.loadPapers();
  }

  options(selected:any){
    console.log('options are cooming soon');
    
    let dataoption = {
      course : this.slectedCourse,
      semester : this.selectedSemester,
      year : this.slectedYear,
    }
    if(this.semesters.length == 0){
      this.slectedCourse = selected ;
      dataoption.course = selected ;
      this.heading=` Previous Year Question Paper / ${this.slectedCourse}`
       this.previousyear.getOption(dataoption).subscribe(response => {
       this.semesters = response;
       console.log("This is semesters", this.semesters);
     })}
     else if(this.courses.length != 0 &&this.semesters.length != 0 && this.years.length == 0){
      this.selectedSemester =selected;
      dataoption.semester = selected ;
      this.heading=` Previous Year Question Paper / ${this.slectedCourse} / ${this.selectedSemester}`
      this.previousyear.getOption(dataoption).subscribe(response => {
        this.years = response;
        console.log("This is years", this.years);
     })}
     else if(this.courses.length != 0 &&this.semesters.length != 0 && this.years.length != 0){
      this.slectedYear = selected;
      dataoption.year = selected ;
      this.heading=` Previous Year Question Paper / ${this.slectedCourse} / ${this.selectedSemester} / ${this.slectedYear} `
      this.previousyear.getPapers(dataoption).subscribe(response => {
        this.pdfFiles = response;
        console.log(this.pdfFiles);
        
      });
     }
    
  }

  // loadPapers(): void {
  //   this.previousyear.getPapers().subscribe(response => {
  //     this.papers = response.map(file => ({
  //       name: file.name,
  //       // url: `/uploads/${file.name}`
  //     }));
  //   });
  // }

  downloadPDF(filename: string): void {
    this.previousyear.downloadFile(filename).subscribe({
      next: (blob: Blob) => {
        // Create a URL for the blob and trigger download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.error('Error downloading file', error);
      }
    });
  }


}
