import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './components/sidenav/home.component';
import { NavbarComponent } from './pages/landingpage/navbar.component';

import { ViewuserComponent } from './pages/users/viewuser/viewuser.component';
import { AdduserComponent } from './pages/users/adduser/adduser.component';
import { EditUserComponent } from './pages/users/edituser/edituser.component';

import { ViewstudentsComponent } from './pages/students/viewstudents/viewstudents.component';
import { AddstudentsComponent } from './pages/students/addstudents/addstudents.component';
import { EditstudentComponent } from './pages/students/editstudent/editstudent.component';
import { EditbyplacerComponent } from './pages/students/editbyplacer/editbyplacer.component';

import { AddnotificationComponent } from './pages/addnotification/addnotification.component';
import { HomedataComponent } from './pages/homedata/homedata.component';
import { CsvComponent } from './pages/csv/csv.component';

import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './pages/error/error.component';
import { RoleGuard } from './my-auth.guard';

const routes: Routes = [

  { path: '', component: NavbarComponent }, //all
  { path: 'login', component: LoginComponent }, //all

  { path: 'home', component: HomeComponent,canActivate: [RoleGuard],data: {roles: ['Admin', 'Training Head', 'Placement Officer']}, //all
  children :[
    { path: '', redirectTo: 'homecomp', pathMatch: 'full' }, //all
    { path: 'homecomp', component: HomedataComponent,canActivate: [RoleGuard],data: {roles: ['Admin', 'Training Head', 'Placement Officer']} }, //all
    { path: 'viewuser', component: ViewuserComponent , canActivate: [RoleGuard], data:{roles: 'Admin'} }, //admin
    { path: 'adduser', component: AdduserComponent , canActivate: [RoleGuard], data:{roles: 'Admin'} }, //admin
    { path: 'edituser/:id', component: EditUserComponent , canActivate: [RoleGuard], data:{roles: 'Admin'} }, //admin
    { path: 'viewstuds',component: ViewstudentsComponent,canActivate: [RoleGuard],data: {roles: ['Admin', 'Training Head', 'Placement Officer']}}, //admin+head+placer
    { path: 'addstuds', component: AddstudentsComponent, canActivate: [RoleGuard], data:{roles: [ 'Admin', 'Training Head']} }, //admin+head
    { path: 'editbypo/:id', component: EditbyplacerComponent , canActivate : [RoleGuard], data: {roles: ['Placement Officer']} }, //placer
    { path: 'editstuds/:id', component: EditstudentComponent , canActivate : [RoleGuard] , data : {roles: ['Admin' , 'Training Head']} }, //admin+head
    { path: 'csv', component: CsvComponent , canActivate: [RoleGuard], data :{roles: ['Admin' , 'Training Head']} }, //admin+head
    { path: 'passchange',component:AddnotificationComponent , canActivate:[RoleGuard], data : {roles: ['Admin']}}, //admin
  ] },

  // { path: 'footer',component:FooterComponent,canActivate: [RoleGuard],data: {roles: ['Admin', 'Training Head', 'Placement Officer']}}, //all
  { path: '**', component: ErrorComponent,canActivate: [RoleGuard],data: {roles: ['Admin', 'Training Head', 'Placement Officer']}}, //all

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}