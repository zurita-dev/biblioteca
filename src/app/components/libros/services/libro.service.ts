import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { libro } from '../models/libro';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';


@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  constructor(private db: AngularFirestore) { }

getLibros(){
  //  return this.db.collection('libro').snapshotChanges().pipe(
  //    map(actions => 
  //     actions.map(a => {
  //       const data = a.payload.doc.data();
  //       const id = a.payload.doc.id;
  //       return {id, ...data};
  //     }))
  //  )  
  
    return this.db.collection('libro').snapshotChanges();
  
} 

 //this.db.collection("libro"). get().then((querySnapshot) => {
    // querySnapshot.forEach((doc) => {
     //    console.log(`${doc.id} => ${doc.data()}`);
  //   });


newLibro(libro){
  return this.db.collection('libro').add(libro);
}


getNewLibro(): libro{
  return {
    titulo: '',
    autor: '',
    anio: new Date,
    descripcion: ''
  }
}
}
