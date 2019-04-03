import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, EmailValidator, Validators } from '@angular/forms';
import{WeatherService} from '../weather.service'
import { MessageService } from '../message.service';
import {Router } from '@angular/router';
import {WeatherForecast} from '../weather-forecast'
import {City} from '../city'
import {WeatherDbService} from '../weather-db.service'
import {ApplicationInfoService} from '../application-info.service'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchZipcodeForm:FormGroup
  weatherResult
  constructor(private weatherService:WeatherService,
    private messageService: MessageService,
    private router: Router,
    private weatherDbService:WeatherDbService,
    private appInfoService:ApplicationInfoService) { }

  ngOnInit() {
    this.searchZipcodeForm = new FormGroup({
      zipcode:  new FormControl('',[
        Validators.required
      ])
    })

    this.appInfoService.setTitle("Search")
  }

  get zipcode() { return this.searchZipcodeForm.get('zipcode'); }

  searchZipcode(){
    this.weatherService.searchZipcode(this.searchZipcodeForm.value.zipcode).subscribe(
      result => {
        this.weatherResult = result
        
        let city:City = new City(this.weatherResult)
        if(!city.isValid){
          this.messageService.setModalMessages("Error Occured", this.weatherResult.message)
        }else{
          this.weatherDbService.addWeather(city)
          this.router.navigateByUrl(`cities/${this.weatherResult.id}`)
        }
      }
    )


  }

}
