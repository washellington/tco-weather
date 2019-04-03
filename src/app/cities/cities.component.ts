import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import{City} from '../city'
import {UserService} from '../user.service'
import {AuthenticationService} from '../authentication.service'
import {WeatherDbService} from '../weather-db.service'
import {ApplicationInfoService} from '../application-info.service'
import { MessageService } from '../message.service';
import {Router } from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CitiesComponent implements OnInit {

  cities: City[] = []
  unit
  constructor(
    public userService:UserService, 
    public authService:AuthenticationService,
    private weatherDbService:WeatherDbService,
    private appInfoService:ApplicationInfoService,
    private messageService: MessageService,
    private router: Router
    ) { }

  ngOnInit() {

    this.userService.getUserCities(this.authService.getLoggedInUser().email).forEach((v, i) =>{
      this.weatherDbService.getWeather(v).subscribe(
        (result) =>{
          if(result.isPersisted){
            this.cities.push(new City(result.cityJson))
          }else{
            this.cities.push(new City(result))
          } 
        }
      )
    })

    this.unit = this.userService.getUserMetricSettingUnit(this.authService.getLoggedInUser().email)

    this.appInfoService.setTitle("Feed")

    if(this.userService.getUserCities(this.authService.getLoggedInUser().email).length == 0){
      $("#add-city-modal").modal('show')

    }

    
  }

  addCity(){
    $("#add-city-modal").modal('hide')
    this.router.navigateByUrl('/search')
  }

}
