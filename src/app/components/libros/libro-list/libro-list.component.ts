import { Component, OnInit } from '@angular/core';
import { libro } from '../models/libro';

@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.css']
})
export class LibroListComponent implements OnInit {

  librosTemporales: libro[] = [
    { titulo: 'Principito', autor: 'Sabina', anio: new Date, descripcion: 'Grande y azul' },
    { titulo: 'Vida de jobs', autor: 'J.K.Rowling', anio: new Date, descripcion: 'pequeño y Rojo' },
    { titulo: 'javascript para novatos', autor: 'F.Kenedy', anio: new Date, descripcion: 'Largo' },
    { titulo: 'Historias de terror ', autor: 'jhon katzenbach', anio: new Date, descripcion: 'pasta dura' },
  ];


  constructor() { }

  displayedColumns: string[] = ['titulo', 'autor', 'anio', 'descripcion'];

  ngOnInit() {
  }

}
