// import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, OnInit , ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/link.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  // sidebar visibility
  isSidebarActive = false;
  @ViewChild('sidebar')
  sidebar!: ElementRef;
  dropdownStates: { [key: string]: boolean } = {}

  collapsed = false;

  // Only for admin
  isAdminpanel=false;
  isAddnoti=false;
  // For Admin & Trainighead
  isAddstudent=false;
  isCsvupload=false;
  currentuser:any;

 

  constructor(private router:Router, private renderer: Renderer2, private serv:LoginService){}

  ngOnInit(): void {
    this.currentuser = this.serv.getUserRole();
    this.menuDisplay();
  }

  menuDisplay() {
    if (this.currentuser === 'Admin') {
      this.isAdminpanel = true;
      this.isAddnoti=true;
      this.isAddstudent=true;
      this.isCsvupload=true;
    } else if(this.currentuser === 'Training Head') {
      this.isAddstudent=true;
      this.isCsvupload=true;
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['']);
  }

  // Toggle the sidebar visibility
  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
    if (this.isSidebarActive) {
      this.renderer.addClass(this.sidebar.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.sidebar.nativeElement, 'active');
    }
    this.dropdownStates={};
  }

  // Submenu toggling
  toggleDropdown(submenuId: string): void {
    const submenu = document.getElementById(submenuId);
    if (submenu) {
      submenu.classList.toggle('show');
    }
  }


}