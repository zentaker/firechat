import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  mensaje: string = "";

  constructor(public ChatService: ChatService) {
    this.ChatService.cargarMensajes().subscribe();
   }


  enviarMensaje() {

    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }
    this.ChatService.agregarMensaje(this.mensaje).then(() => {
      this.mensaje = "";
    }).catch((err) => {
      console.error('Error al enviar', err);
    })
    
    
  }

 

}
