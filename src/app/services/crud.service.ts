import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // el constructor tiene el objeto de firebase para consultas, y coleccion el cual llegará en el super de los servicios que extiende
  // así podremos identificar con que coleccion trabajar en cada llamada a la función , y nos ahorraremos codigo.
  constructor(private db: AngularFirestore,private coleccion:string) { }

getAll(coleccion?){
  // Obtiene documentos de la coleccion que llegue en parametro (coleccion), si no hay elemento, toma el que
  // Tenga asignado el constructor del servicio que llama a esta funcion- 
  return this.db.collection(coleccion ? coleccion : this.coleccion).snapshotChanges();
}

getItemByPropiedad(cadenaABuscar,propiedad?){
  // Buscamos coleccion por la propiedad que llega, dependiendo de la coleccion que tenemos,
  // por el constructor del servicio, es que se asigna la propiedad.
  if(this.coleccion == 'autor'){
    propiedad == true ? propiedad = 'nacionalidad' : propiedad = 'nombre'
  }else{
    propiedad = 'titulo'
  }

  // obtenemos el documento en la coleccion que llegue como parametro (coleccion). 
 
  //propiedad es , 1 = nombre, 2 = nacionalidad  
  // Obtiene autor por nombre 
  return this.db.collection(this.coleccion,ref => ref.where(propiedad, '==', cadenaABuscar)).snapshotChanges()
}

getByFiltro(filtro){
  // Los números de filtros corresponden a las opciones, 1= nombre , 2 = nacionalidad,
  //  3 = año de nacimiento/año del libro 4 = por titulo.

  switch (filtro) {
    case 1:
      return this.db.collection(this.coleccion,ref => ref.orderBy('nombre')).snapshotChanges();
    case 2:
      return this.db.collection(this.coleccion,ref => ref.orderBy('nacionalidad')).snapshotChanges();
    case 3:
      return this.db.collection(this.coleccion,ref => ref.orderBy('anio','desc')).snapshotChanges();
    case 4: 
      return this.db.collection(this.coleccion,ref => ref.orderBy('titulo')).snapshotChanges();
      // en el caso 5 lo dejaremos pendiente, pues guardamos el id de el autor, pero es alfanumerico,
      // entonces tendriamos que realizar consulta anidada.


    // case 5: 
    //   return this.db.collection(this.coleccion,ref => ref.orderBy('autor','desc')).snapshotChanges();
  }
}



createItem(Item){
  // añade documento a la coleccion que llegue como parametro en coleccion. 
  return this.db.collection(this.coleccion).add(Item);
}

updateItem(itemId, itemActualizado){
  // Actualiza documento con el id ( itemId ), con el objeto que llega itemActualizado; 
    return this.db.collection(this.coleccion).doc(itemId).set(itemActualizado);
}

deleteItem(itemId){
  // Elimina documento con el id ( itemId ),en la coleccion que llega como parametro en coleccion 
  return this.db.collection(this.coleccion).doc(itemId).delete();
}

formatearFecha(Item){
  // damos formato a la fecha, de date a milisegundos
  Item.anio = JSON.parse(JSON.stringify((new Date(Item.anio)).getTime())); 
  return Item
}

}
