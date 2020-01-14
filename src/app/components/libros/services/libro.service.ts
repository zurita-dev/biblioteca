import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { libro } from '../models/libro';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { CrudService } from 'src/app/services/crud.service';


@Injectable({
  providedIn: 'root'
})
export class LibroService extends CrudService{
  
  constructor(private _db: AngularFirestore) {
    super(_db,'libro');
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
