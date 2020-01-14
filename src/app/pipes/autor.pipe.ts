import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { AutorService } from '../components/autor/services/autor.service';

@Pipe({
  name: 'autor'
})
export class AutorPipe implements PipeTransform{
  
  objetoAutor:any;
  constructor() {
  }
  

  transform(value: any, ...args: any[]): any {
    // recibimos en args un array de parametros, tomamos el primero que corresponde al array de autores,
    // aplicamos un filtro para comparar cada objeto autor, con el id que recibimos en valuue
    // nos regresa un array con los elementos que cumplan eso, y tomamos el primero
  this.objetoAutor = args[0].filter(element => element.id === value );

  // revisamos que el array no esté vacío, si lo está significa que no hay autor en firebase con ese id, 
  // puede deberse a que fue borrado, así que en esos casos regresamos 'Autor no encontrado'
  if(this.objetoAutor.length !== 0){
    return this.objetoAutor[0].data.nombre;
  }else{
    return 'Autor no encontrado'
  }
  }



}
