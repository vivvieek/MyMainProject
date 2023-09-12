import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentdataService } from 'src/app/shared/studentdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstudents',
  templateUrl: './addstudents.component.html',
  styleUrls: ['./addstudents.component.css']
})
export class AddstudentsComponent implements OnInit{

  buttoncontrol=true;
  studdetail={
    id:'',
    name:'',
    course:'',
    project:'',
    batch:'',
    status:'',
    placement:''
  }

  constructor(public serv:StudentdataService,private router:Router){}
  ngOnInit(): void {
    
  }
  submit(){
    this.serv.addstudent(this.studdetail).subscribe((res=>{
      alert("Student Added")
      this.router.navigate(['home/viewstuds']);
    }))
    
  }
  cancel():void{
    this.studdetail = { 
      id: '',
      name: '',
      course: '',
      project: '',
      batch: '',
      status: '',
      placement: ''
    };
  }
}