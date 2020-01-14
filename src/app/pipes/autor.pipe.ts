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

  this.objetoAutor = args[0].filter(element => element.id === value );
  console.log(this.objetoAutor, ' - ', this.objetoAutor.length);

  if(this.objetoAutor.length !== 0){
    return this.objetoAutor[0].data.nombre;
  }else{
    return 'Autor no disponible'
  }
  }



}
