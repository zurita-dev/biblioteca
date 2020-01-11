import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { autor } from '../models/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private db: AngularFirestore) { }
  getAutores(){
  return this.db.collection('autor').snapshotChanges();
} 

createAutor(autor){
  return this.db.collection('autor').add(autor);
}

updateAutor(autorId, autor){
    return this.db.collection('autor').doc(autorId).set(autor);
}

deleteAutor(autorId){
  return this.db.collection('autor').doc(autorId).delete();
}


getNewAutor(): autor{
  return {
    nombre: '',
    nacionalidad: '',
    anio: new Date,
  }
}
}
