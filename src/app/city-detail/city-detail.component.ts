import { Component, OnInit } from '@angular/core';
import {City} from '../city'
import {WeatherDbService} from '../weather-db.service'
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service'
import { MessageService } from '../message.service';
import {AuthenticationService} from '../authentication.service'
import {ApplicationInfoService} from '../application-info.service'
import {Chart} from 'chart.js';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {
  city:City
  constructor( 
    private route: ActivatedRoute,
    private weatherDbService:WeatherDbService,
    private userService:UserService,
    private authService:AuthenticationService,
    private messageService: MessageService,
    private appInfoService:ApplicationInfoService
  ) { }
  unit
  barChart
  LineChart = []
  forecastLabels = []
  forecastHighs = []
  forecastLows = []

  ngOnInit() {
    

    this.weatherDbService.getWeather(this.route.snapshot.paramMap.get('id')).subscribe(
      (result) =>{
        if(result.isPersisted){
          this.city = new City(result.cityJson)
        }else{
          this.city = new City(result)
        }
        if(this.city.fiveDayForecast.length == 0){
          this.weatherDbService.get5DayForecast(this.city.id).subscribe(
            (result) =>{
              if(result.isPersisted){
                this.city.fiveDayForecast = result.fiveDayForecast
              }else if(result.cod == 200){
                this.city.setFiveDayForecast(result)
                
                this.weatherDbService.addWeather(this.city)
                console.log(`fetched:`, this.city)
              }else{
                this.messageService.setModalMessages("Error Occurred", "Error retreiving 5 day forecast")
              }
              
              this.initializeChart('forecastChart')

            }
          )
        }
        this.appInfoService.setTitle(this.city.displayName())
        this.unit = this.userService.getUserMetricSettingUnit(this.authService.getLoggedInUser().email)
        



      }
    )
  }

  getChartLabels(){
    for( let forecast of this.city.fiveDayForecast){
      this.forecastLabels.push(formatDate(forecast.date, 'MM/dd/yy', 'en-US'))
      this.forecastHighs.push(forecast.high)
      this.forecastLows.push(forecast.low)
    }
  }


  initializeChart(id:string){
    this.getChartLabels()
    this.LineChart = new Chart(id, {
      type: 'line',
    data: {
     labels: this.forecastLabels,
     datasets: [{
         label: 'Highs',
         data: this.forecastHighs,
         fill:false,
         lineTension:0.2,
         borderColor:"red",
         borderWidth: 1
     },
     {
      label: 'Lows',
      data: this.forecastLows,
      fill:false,
      lineTension:0.2,
      borderColor:"blue",
      borderWidth: 1
    }]
    }, 
    options: {
     title:{
         text:"5 Day Forecast",
         display:true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:false
             }
         }]
     }
    }
    });
  }

  addCity(){
    let cities:string[] = this.userService.getUserCities(this.authService.getLoggedInUser().email)
    cities.push(this.city.id)
    this.userService.setUserCities(this.authService.getLoggedInUser().email, cities)
    this.messageService.setModalMessages("Success", "Successfully added city")
    console.log(`Added user city:${this.city.id}`, cities)
  }

  isCityAdded():boolean{
    //console.log("Current user cities", this.userService.getUserCities(this.authService.getLoggedInUser().email))
    return this.userService.getUserCities(this.authService.getLoggedInUser().email).filter((v) =>{
      return v == this.city.id
    }).length > 0
  }

  removeCity(){
    let cities:string[] = this.userService.getUserCities(this.authService.getLoggedInUser().email)
    cities.splice(cities.indexOf(this.city.id), 1)
    this.userService.setUserCities(this.authService.getLoggedInUser().email, cities)
    this.messageService.setModalMessages( "Success", "Removed city")
    console.log(`Removed user city:${this.city.id}`, cities)

  }

}
