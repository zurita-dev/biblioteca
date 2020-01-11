import { Component, OnInit } from '@angular/core';
import { libro } from '../models/libro';
import { LibroService } from '../services/libro.service';
import { LibroCreateComponent } from '../libro-create/libro-create.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.sass']
})
export class LibroListComponent implements OnInit {

  items: Array<any>;
  listLibros: any;

  // librosTemporales: libro[] = [
  //   { titulo: 'Principito', autor: 'Sabina', anio: new Date, descripcion: 'Grande y azul' },
  //   { titulo: 'Vida de jobs', autor: 'J.K.Rowling', anio: new Date, descripcion: 'pequeño y Rojo' },
  //   { titulo: 'javascript para novatos', autor: 'F.Kenedy', anio: new Date, descripcion: 'Largo' },
  //   { titulo: 'Historias de terror ', autor: 'jhon katzenbach', anio: new Date, descripcion: 'pasta dura' },
  // ];
  librosTemporales: any;
 displayedColumns: string[] = ['titulo', 'autor', 'anio', 'descripcion','titulo'];

  constructor(private libroService: LibroService, public dialog: MatDialog) { 
  }

 

  ngOnInit() {
    this.getLibros();
  }

  getLibros(){


      this.libroService.getLibros()
      .subscribe(result => {
        this.items = result;
        this.listLibros = result.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
       // console.log(this.items[0].payload.doc.data());
        console.log(this.listLibros);
      })


       //  return this.db.collection('libro').snapshotChanges().pipe(
  //    map(actions => 
  //     actions.map(a => {
  //       const data = a.payload.doc.data();
  //       const id = a.payload.doc.id;
  //       return {id, ...data};
  //     }))
  //  )  

    
    // this.librosTemporales = this.libroService.getLibros().valueChanges().toPromise().then((res:any) => {
    //   console.log('libros temporales: ',res);
    // },
    // (err:any) => {
    //   console.log('error: ', err);
    // });
    // console.log(this.librosTemporales);


    //  subscribe(result => {
    //   console.log('Libros temporales: ', this.librosTemporales);
    //   console.log('id', this.librosTemporales[0].id);
    // });
  }

  deleteLibro(libroId){
    this.libroService.deleteLibro(libroId).then((res) => {
      console.log('Borrado exitoso', res);
    },
    (err) => {
      console.log('Error al borrar: ', err);
    })
  }

  dialogLibro(book?){
      const dialogRef = this.dialog.open(LibroCreateComponent, {
        width: '250px',
         data: book? JSON.parse(JSON.stringify(book)) : this.libroService.getNewLibro()
      });
  }
}
