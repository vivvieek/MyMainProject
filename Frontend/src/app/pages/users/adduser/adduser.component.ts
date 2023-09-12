import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/shared/userdata.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  user:any={
    name:'',
    role:'',
    email:'',
    password:''
  }

  constructor(private userDataService: UserdataService,private router:Router) { }

  ngOnInit(): void {
  }

  addUser(): void {
    this.userDataService.addUser(this.user).subscribe(
      (response) => {
        window.alert('User added successfully!');
        this.router.navigate(['home/viewuser']) 
      },
      (error) => {
        window.alert('Error adding user. Please try again.');
        console.error(error);
      }
    );
  }

  clearForm(): void {
    this.user = {
      name:'',
      role:'',
      email:'',
      password:''
    }; // Clear the form fields

  }
}