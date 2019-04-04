import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router } from '@angular/router';
import {ApplicationInfoService} from '../application-info.service'
import { $ } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  open:boolean = false
  appTitle:string = ""
  constructor(public authService: AuthenticationService,
    private router: Router, private appInfoService:ApplicationInfoService) { }

  ngOnInit() {
    this.appInfoService.getTitle().subscribe(
      (result) =>{
        this.appTitle = result
      }
    )
  }

  logout(){
    this.authService.logoutUser()
    this.navigateClick("/login")
  }
  
  toggleNavBar(){
    this.open = !this.open
  }

  searchClick(){
    this.navigateClick("/search")
  }

  closeOverlay(){
    this.open = false
  }

  navigateClick(x){
    this.closeOverlay()
    this.router.navigateByUrl(x)

  }


}
