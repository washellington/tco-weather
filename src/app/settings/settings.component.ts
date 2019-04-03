import { Component, OnInit } from '@angular/core';
import{UserService } from '../user.service'
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import {Router } from '@angular/router';
import { MessageService } from '../message.service';
import {ApplicationInfoService} from '../application-info.service'
import {WeatherDbService} from '../weather-db.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm:FormGroup

  constructor(public userService:UserService, private authService:AuthenticationService,
    private router: Router,
    private messageService:MessageService,
    private appInfoService:ApplicationInfoService,
    private weatherDbService:WeatherDbService ) { }

  ngOnInit() {
    this.settingsForm = new FormGroup({
      metrics: new FormControl(this.userService.getUserMetricSetting(this.authService.getLoggedInUser().email))
    })
    this.appInfoService.setTitle("Settings")

  }

  get metrics() { return this.settingsForm.get('metrics'); }


  save(){
    this.userService.setUserMetricSetting(this.authService.getLoggedInUser().email, this.settingsForm.value.metrics)    
  }

  toggleMetrics(){
    this.settingsForm.get('metrics').setValue(!this.settingsForm.value.metrics)
    this.save()
    this.userService.getUserCities(this.authService.getLoggedInUser().email).forEach( v => this.weatherDbService.clearWeather(v))
    
  }

}
