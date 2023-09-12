import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from 'src/app/components/sidenav/home.component';
import { UserdataService } from 'src/app/shared/userdata.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EditUserComponent implements OnInit {
  userId!: string;
  user: any = {};

  constructor(private route: ActivatedRoute, private userDataService: UserdataService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.userDataService.getUserById(this.userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  updateUser(): void {
    if (this.user.newPassword) {
      this.user.password = this.user.newPassword;
    } else {
      // Remove password property if not updating password
      delete this.user.password;
    }
  
    console.log('Updating user:', this.user);
  
    this.userDataService.updateUser(this.userId, this.user).subscribe(
      (response) => {
        console.log('Update successful:', response.message);
        alert('Edited User')
        this.router.navigate(['home/viewuser'])
      },
      (error) => {
        console.error('Update error:', error);
      }
    );
  }
  
}
