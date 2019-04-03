import { Component, OnInit,Input } from '@angular/core';
import { MessageService } from '../message.service';
declare var $: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService:MessageService) { }

  modalTitle:string
  modalBody:string
  ngOnInit() {
    this.messageService.getModalMessages().subscribe(
      (messageArray) =>{
        if(messageArray.length == 2){
          console.log("MessageService display message", messageArray)
          this.modalTitle = messageArray[0]
          this.modalBody = messageArray[1]
          this.open()
        }
      }
    )
 
  }

  


  open() {
    $("#app-message-modal").modal('show')
     this.messageService.clear()
  }


}
