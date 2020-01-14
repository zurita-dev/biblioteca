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

getItemByPropiedad(cadenaABuscar,propiedad){

  if(this.coleccion == 'autor'){
    propiedad == true ? propiedad = 'nacionalidad' : propiedad = 'nombre'
  }else{
    propiedad == true ? propiedad = 'autor' : propiedad = 'titulo'
  }

  // obtenemos el documento en la coleccion que llegue como parametro (coleccion). 
 
  //propiedad es , 1 = nombre, 2 = nacionalidad  
  // Obtiene autor por nombre 
  return this.db.collection(this.coleccion,ref => ref.where(propiedad, '==', cadenaABuscar)).snapshotChanges()
}

getByFiltro(filtro,txtFiltro){
console.log('Filtro: ',filtro, ' txtFiltro: ',txtFiltro, ' coleccion: ',this.coleccion );
  // Los números de filtros corresponden a las opciones, 1= nombre , 2 = nacionalidad, 3 = año de nacimiento
  // después de selecionar el filtro que corresponde, verifica si hay texto en la variable (txtFiltro) , 
    // si existe, realiza la consulta con un where y order by, en caso de que no haya texto, solo realiza la busqueda y la ordena por el filtro.  
  if(filtro == 1){
    if(txtFiltro !== ''){
      return this.db.collection(this.coleccion,ref => ref.where('nombre','==',txtFiltro).orderBy('nombre')).snapshotChanges();
    }else{
      return this.db.collection(this.coleccion,ref => ref.orderBy('nombre')).snapshotChanges();
    }
  }else if(filtro === 2){
    if(txtFiltro !== ''){
      return this.db.collection(this.coleccion,ref => ref.where('nombre','==',txtFiltro).orderBy('nacionalidad')).snapshotChanges();
    }else{
      return this.db.collection(this.coleccion,ref => ref.orderBy('nacionalidad')).snapshotChanges();
    }
  }else if(filtro === 3){
    if(txtFiltro !== ''){
      return this.db.collection(this.coleccion,ref => ref.where('nombre','==',txtFiltro).orderBy('anio','desc')).snapshotChanges();
    }else{
      return this.db.collection(this.coleccion,ref => ref.orderBy('anio','desc')).snapshotChanges();
    }
  };
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
  Item.anio = JSON.parse(JSON.stringify((new Date(Item.anio)).getTime())); 
  return Item
}

}
