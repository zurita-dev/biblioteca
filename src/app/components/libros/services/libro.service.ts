import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  constructor(private db: AngularFirestore) { }

getLibros(){
    return  this.db.collection('libro').valueChanges();
    // this.items = this.db  .collection('libro').valueChanges();
  }
newLibro
}
