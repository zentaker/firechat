import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public usuario: any = {};


  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) {

    //subcribirse a un obserbable para obtener informacion del usuario
    this.auth.authState.subscribe(user => {
      //cuaando es la primera vez
      console.log('Estado del usuariuo', user)
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    })
   
  }
  login(proveedor: string) {
    
    if (proveedor === 'google') {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      
    } else {
      this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
    
  }
  logout() {
    this.usuario = {};
    this.auth.signOut();
  }
  cargarMensajes(){

    //mandar querys a firebase
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));

  
    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      console.log(mensajes);

      this.chats = mensajes.reverse();
      
      //this.chats = mensajes;
    }))

  }
  agregarMensaje(texto: string) {
    //falta el uid del usuario
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    return this.itemsCollection.add(mensaje);


  }
}
