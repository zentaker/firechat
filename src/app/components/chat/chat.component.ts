import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  elemento: any;

  constructor(public ChatService: ChatService) {
    this.ChatService.cargarMensajes().subscribe(() => {

      setTimeout(() => {
           //cuando llegen los mensajes mover el foco al final
      this.elemento.scrollTop = this.elemento.scrollHeight;
        
      },50)

   
    });
    
  }
  
  ngOnInit() {
    //hacer la referencia al alemento en el Html
    this.elemento = document.getElementById('app-mensajes');

     
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
