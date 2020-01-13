import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { autor } from '../models/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private db: AngularFirestore) { }

getAutores(){
  // Obtiene documentos de la coleccion AutorService. 
  return this.db.collection('autor').snapshotChanges();
}

getAutorByPropiedad(cadenaABuscar,propiedad){
  propiedad == true ? propiedad = 'nombre' : propiedad= 'nacionalidad'
  //propiedad es , 1 = nombre, 2 = nacionalidad  
  // Obtiene autor por nombre 
  return this.db.collection('autor',ref => ref.where(propiedad, '==', cadenaABuscar)).snapshotChanges()
}

getByFiltro(filtro,txtFiltro){

  // Los números de filtros corresponden a las opciones, 1= nombre , 2 = nacionalidad, 3 = año de nacimiento
  // después de selecionar el filtro que corresponde, verifica si hay texto en la variable (txtFiltro) , 
    // si existe, realiza la consulta con un where y order by, en caso de que no haya texto, solo realiza la busqueda y la ordena por el filtro.  
  if(filtro == 1){
    if(txtFiltro !== ''){
      return this.db.collection('autor',ref => ref.orderBy('nombre').where('nombre','==',txtFiltro)).snapshotChanges();
    }else{
      return this.db.collection('autor',ref => ref.orderBy('nombre')).snapshotChanges();
    }
  }else if(filtro === 2){
    if(txtFiltro !== ''){
      return this.db.collection('autor',ref => ref.orderBy('nacionalidad').where('nombre','==',txtFiltro)).snapshotChanges();
    }else{
      return this.db.collection('autor',ref => ref.orderBy('nacionalidad')).snapshotChanges();
    }
  }else if(filtro === 3){
    if(txtFiltro !== ''){
      return this.db.collection('autor',ref => ref.where('nombre','==',txtFiltro).orderBy('anio','desc')).snapshotChanges();
    }else{
      return this.db.collection('autor',ref => ref.orderBy('anio','desc')).snapshotChanges();
    }
  };
}


createAutor(autor:autor){
  // añade documento a la coleccion autor. 
  return this.db.collection('autor').add(autor);
}

updateAutor(autorId, autorNuevo:autor){
  // Actualiza documento con el id ( autorId ), con el objeto que llega autorNuevo; 
    return this.db.collection('autor').doc(autorId).set(autorNuevo);
}

deleteAutor(autorId){
  // Elimina documento con el id ( autorId ), con el objeto que llega autorNuevo; 
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
