import { Component, OnInit } from '@angular/core';
import { AutorService } from '../services/autor.service';
import {MatDialog} from '@angular/material/dialog';
import { AutorCreateComponent } from '../autor-create/autor-create.component';
import {faSortAlphaDown, faSortNumericDownAlt} from '@fortawesome/free-solid-svg-icons';
import { autorConId, autor } from '../models/autor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css']
})
export class AutorListComponent implements OnInit {
  items: Array<any>
  listAutor: any[] = [];
  searchName = '';
  placeholderSearch = "Busqueda por nombre"
  estadoBusqueda = 0;
  porNacionalidad = false;
  // icon awesome
  faSortAlphaDown = faSortAlphaDown
  faSortNumericDownAlt = faSortNumericDownAlt
  constructor(private toastr: ToastrService, private autorService: AutorService, public dialog: MatDialog) { }

  
  ngOnInit() {
    this.getAutores();
  }

  getAutores(){
    // obtengo los autores y me subscribo a los cambios
      this.autorService.getAll()
      .subscribe(result => {
        // mapeo los documentos, para asignarles el id y la información propia del autor, ya que por default 
          // firebase manda los documentos con el id y la data separados, y los necesito juntos para asignarlos 
          // a los update y delete correspondientes a la información que se está mostrando en la lista
        this.listAutor = result.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })
  }
  getAutorBy(){
    // Realizo con la cadena que tenga asignada la variable (searchName) la busqueda, por nacionalidad o nombre
    //  dependiendo del valor que tenga el boolean (porNacionalidad) asignado, false = por nombre, true = por nacionalidad
    // , busco lo que tenga contenido la variable (searchName), y me suscribo.
    if(this.searchName !== ''){
      this.autorService.getItemByPropiedad(this.searchName,this.porNacionalidad).subscribe(result => {
      this.items = result;
      this.listAutor = result.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id,data}
      })
    })
    }else{
      this.getAutores();
    }
  }

  busquedaxFiltro(){
    this.porNacionalidad = !this.porNacionalidad;
    // revisamos el filtro por el que se realizará la busqueda
    if(this.porNacionalidad == true){
       this.placeholderSearch = "Por Nacionalidad";
      }else{
        this.placeholderSearch = "Por Nombre";
      }
      
  }

  filtrarPor(idCase){
    // dependiendo el número que llegue en idCase , es el que mandaremos a la función del servicio autor,
    this.estadoBusqueda = idCase; 
      this.autorService.getByFiltro(idCase)
      .subscribe(result => {
        this.items = result;
        this.listAutor = result.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })     
  }

  deleteAutor(AutorId){
    this.autorService.deleteItem(AutorId).then((res) => {
      this.toastr.success('Autor eliminado', 'Éxito');
    },
    (err) => {
      this.toastr.error('Autor no pudo ser eliminado', 'Error');
    })
  }

  dialogAutor(autor?){
      const dialogRef = this.dialog.open(AutorCreateComponent, {
        width: '250px',
         data: autor? JSON.parse(JSON.stringify(autor)) : this.autorService.getNewAutor()
      });
  }
}
