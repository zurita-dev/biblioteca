import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { autor } from '../models/autor';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AutorService extends CrudService{

  constructor(private _db: AngularFirestore) {
    super(_db,'autor');
  }



getNewAutor(): autor{
  return {
    nombre: '',
    nacionalidad: '',
    anio: new Date,
  }
}
}
