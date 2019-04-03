import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private persistenceService: PersistenceService) { }


  getUserMetricSettingUnit(email):string{
    return this.persistenceService.get(`settings[${email}][isImperial]`, StorageType.LOCAL) ? 'metric'  : 'imperial'
  }

  getUserMetricSetting(email):boolean{
    return this.persistenceService.get(`settings[${email}][isImperial]`, StorageType.LOCAL) || false
  }

  setUserMetricSetting(email, value:boolean){
    this.persistenceService.set(`settings[${email}][isImperial]`, value, {type: StorageType.LOCAL})
  }

  clearUserMetricSetting(email){
    this.persistenceService.remove(`settings[${email}][isImperial]`, StorageType.LOCAL)

  }

  getUserCities(email):string[]{
    let result = this.persistenceService.get(`settings[${email}][cities]`, StorageType.LOCAL) 
    return  Array.isArray(result) ? result : []
  }

  setUserCities(email, cities:string[]){
    this.persistenceService.set(`settings[${email}][cities]`, cities, {type: StorageType.LOCAL})
  }

  clearUserCities(email){
    this.persistenceService.remove(`settings[${email}][cities]`, StorageType.LOCAL)

  }

}