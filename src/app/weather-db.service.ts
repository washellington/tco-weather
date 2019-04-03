import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import {City} from './city'
import {WeatherService} from './weather.service'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDbService {

  constructor(private persistenceService: PersistenceService,
    private weatherService:WeatherService) { }

  getWeather(cityId:string):Observable<City>{
    this.persistenceService.clean()
    let city:City = this.persistenceService.get(`weather[${cityId}]`, StorageType.LOCAL)
    if(city){
      city.isPersisted = true
      return of(city)

    }else{ 
     return this.weatherService.searchById(cityId)
    }
  }

  get5DayForecast(cityId:string):Observable<any>{
    let city:City = this.persistenceService.get(`weather[${cityId}]`, StorageType.LOCAL)
    if(city != undefined && city.fiveDayForecast.length > 0){
      city.isPersisted = true
      return of(city)

    }else{ 
     return this.weatherService.search5DayForecase(cityId)
    }
  }


  addWeather(city:City){
    if(city.isValid)
      this.persistenceService.set(`weather[${city.id}]`, city, {type: StorageType.LOCAL, expireAfter: 10 * 60 * 1000})
  }

  clearWeather(cityId:string){
    this.persistenceService.remove(`weather[${cityId}]`, StorageType.LOCAL)
  }

  removeAllWeather(){
    this.persistenceService.removeAll()
  }


}
