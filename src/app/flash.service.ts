import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})

export class FlashType{
  ERR = "ERROR"
  SUCC = "SUCCESS"
  ALERT = "ALERT"
}

export class FlashMessage{
  msg:string
  type:string
  title:string
}
export class FlashService {
  static FLASH_MESSAGE = 'message';
  static FLASH_TYPE = 'type';
  static FLASH_TITLE = 'title';

  constructor(private persistenceService: PersistenceService) { }

  addFlash(type:string, msg:String, title:String = "Alert"){
    this.persistenceService.set(FlashService.FLASH_MESSAGE, msg, {type :StorageType.MEMORY})  
    this.persistenceService.set(FlashService.FLASH_TYPE, type, {type :StorageType.MEMORY})  
    this.persistenceService.set(FlashService.FLASH_TITLE, title, {type :StorageType.MEMORY})  
  }

  getFlash():FlashMessage{
    return {
      type: this.persistenceService.get(FlashService.FLASH_TYPE, StorageType.MEMORY),
      msg: this.persistenceService.get(FlashService.FLASH_MESSAGE, StorageType.MEMORY),
      title: this.persistenceService.get(FlashService.FLASH_TITLE, StorageType.MEMORY)
    }
  
  }
  
}
