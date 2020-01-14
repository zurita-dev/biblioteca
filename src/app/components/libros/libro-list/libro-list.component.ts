import { Component, OnInit } from '@angular/core';
import { libro } from '../models/libro';
import { LibroService } from '../services/libro.service';
import { LibroCreateComponent } from '../libro-create/libro-create.component';
import {MatDialog} from '@angular/material/dialog';
import {faSortAlphaDown, faSortNumericDownAlt} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.sass']
})
export class LibroListComponent implements OnInit {

  items: Array<any>;
  listLibros:  any[] = [];
  listAutores:  any[] = [];
  searchName = '';
  placeholderSearch = "Busqueda por Título"
  estadoBusqueda = 0;
  porAutor = false;
  // icon awesome
  faSortAlphaDown = faSortAlphaDown
  faSortNumericDownAlt = faSortNumericDownAlt


  constructor(private toastr: ToastrService, private libroService: LibroService, public dialog: MatDialog) { 
  }

 

  ngOnInit() {
    this.getAutores();
    this.getLibros();
  }

  getLibros(){

 // obtengo los autores y me subscribo a los cambios
 this.libroService.getAll()
 .subscribe(result => {
   // mapeo los documentos, para asignarles el id y la información propia del libro, ya que por default 
     // firebase manda los documentos con el id y la data separados, y los necesito juntos para asignarlos 
     // a los update y delete correspondientes a la información que se está mostrando en la lista
   this.listLibros = result.map(a => {
     const data = a.payload.doc.data();
     const id = a.payload.doc.id;
     return {id,data}
   })
   console.log('pasando el map',  this.listLibros);
 })
  }

  getAutores(){

    // obtengo los autores y me subscribo a los cambios
    this.libroService.getAll('autor')
    .subscribe(result => {
      // mapeo los documentos, para asignarles el id y la información propia del autor, ya que por default 
        // firebase manda los documentos con el id y la data separados, y los necesito juntos para mandarlos
        // al pipe y evitar que haga multiples consultas
      this.listAutores = result.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id,data}
      })
      console.log('pasando el map - autores',  this.listAutores);
    })
     }

  getAutorBy(){
    // Realizo con la cadena que tenga asignada la variable (searchName) la busqueda, por Título o Autor
    //  dependiendo del valor que tenga el boolean (porAutor) asignado, false = por Título, true = por Autor
    // , busco lo que tenga contenido la variable (searchName), y me suscribo.
    if(this.searchName !== ''){
      this.libroService.getItemByPropiedad(this.searchName,this.porAutor).subscribe(result => {
      this.items = result;
      this.listLibros = result.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id,data}
      })
    })
    }else{
      this.getLibros();
    }
  }
  busquedaxFiltro(){
    this.porAutor = !this.porAutor;
    // revisamos el filtro por el que se realizará la busqueda
    if(this.porAutor == true){
       this.placeholderSearch = "Por Autor";
      }else{
        this.placeholderSearch = "Por Título";
      }
      
  }

  filtrarPor(idCase){
    this.estadoBusqueda = idCase; 
      this.libroService.getByFiltro(idCase,this.searchName)
      .subscribe(result => {
        this.items = result;
        this.listLibros = result.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })     
  }

  deleteLibro(LibroId){
    this.libroService.deleteItem(LibroId).then((res) => {
      this.toastr.success('Libro eliminado', 'Éxito');
    },
    (err) => {
      this.toastr.error('Libro no pudo ser eliminado', 'Error');
    })
  }

  dialogLibro(book?){
      const dialogRef = this.dialog.open(LibroCreateComponent, {
        width: '250px',
         data: book? JSON.parse(JSON.stringify(book)) : this.libroService.getNewLibro()
      });
  }
}
