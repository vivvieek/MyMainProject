import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentdataService } from 'src/app/shared/studentdata.service';
import { LoginService } from 'src/app/shared/link.service';

@Component({
  selector: 'app-viewstudents',
  templateUrl: './viewstudents.component.html',
  styleUrls: ['./viewstudents.component.css']
})
export class ViewstudentsComponent implements OnInit{

  currentuser:any;
  isDeletebutton=false;

  studdetail:any;
  constructor(public serv:StudentdataService, public router:Router, public serv2:LoginService){}
  ngOnInit(): void {
    this.fetchstuds();
    this.currentuser = this.serv2.getUserRole();
    console.log("user:"+this.currentuser)
    this.displayOptions();
  }

  displayOptions(){
    if (this.currentuser === 'Admin' || this.currentuser === 'Training Head') {
      this.isDeletebutton = true;
    } else if(this.currentuser === 'Placement Officer') {
      this.isDeletebutton=false;
    }
  }

  fetchstuds():void{
    this.serv.getstudentdata().subscribe((data=>{
      this.studdetail=data;
      console.log(this.studdetail)
    }))
    this.currentuser = this.serv2.getUserRole();
  }

  edititem(id:any){
    if (this.currentuser === 'Admin' || this.currentuser === 'Training Head') {
      this.router.navigate(['home/editstuds/' + id]);
    } else if (this.currentuser === 'Placement Officer') {
      this.router.navigate(['home/editbypo/' + id]);
    }
  }

  delitem(id:any){
    this.serv.delitem(id).subscribe(data=>console.log(data))
    alert('Data deleted')
    this.fetchstuds();
  }
}