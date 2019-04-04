import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, EmailValidator, Validators } from '@angular/forms';
import {LoginService} from '../login.service'
import { User } from '../user';
import {Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { MessageService } from '../message.service';
import { pipe } from '@angular/core/src/render3';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private authService:AuthenticationService,
    private loginService:LoginService,
    private route: ActivatedRoute,
    private router: Router, private messageService:MessageService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.router.navigateByUrl('/cities')
    }
    this.loginForm = new FormGroup({
      email:  new FormControl('',[
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    })
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }
  
  successLogin(user:User){
    this.messageService.show('Successful login')
    this.authService.loginUser(user)
    if(this.authService.isLoggedIn()){
      this.router.navigateByUrl(this.authService.redirectUrl || "/cities")
      this.authService.redirectUrl = ""
    }
  }

  invalidLogin(){
    this.messageService.setModalMessages('Login Error', `Invalid email/password`);
    this.router.navigateByUrl("/")
  }

  login(){
    let user:User = {email: this.loginForm.value.email, password: this.loginForm.value.password}

    if(this.authService.checkUser(user)){ 
      
        this.successLogin(user)
      }else{
        this.invalidLogin()
      }
    }
    
}


