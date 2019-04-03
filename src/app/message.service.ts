import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];
  category:string
  modalMessages = new BehaviorSubject([])
  modalMessages$ = this.modalMessages.asObservable()
 
  
  show(message:string){
    console.log(message)
  }
 
  clear() {
    this.messages = [];
    this.category =  ""
  }

  getModalMessages():Observable<any[]>{
    return this.modalMessages$
  }

  setModalMessages(title, message){
    this.modalMessages.next([title, message])
  }

}
