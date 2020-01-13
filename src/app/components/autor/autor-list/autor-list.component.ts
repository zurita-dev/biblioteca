import { Component, OnInit } from '@angular/core';
import { AutorService } from '../services/autor.service';
import {MatDialog} from '@angular/material/dialog';
import { AutorCreateComponent } from '../autor-create/autor-create.component';
import {faSortAlphaDown, faSortNumericDownAlt} from '@fortawesome/free-solid-svg-icons';
import { autorConId, autor } from '../models/autor';

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
  constructor(private autorService: AutorService, public dialog: MatDialog) { }

  
  ngOnInit() {
    this.getAutores();
  }

  getAutores(){
    // obtengo los autores y me subscribo a los cambios
      this.autorService.getAutores()
      .subscribe(result => {
        // mapeo los documentos, para asignarles el id y la información propia del autor, ya que por default 
          // firebase manda los documentos con el id y la data separados, y los necesito juntos para asignarlos 
          // a los update y delete correspondientes a la información que se está mostrando en la lista
        this.listAutor = result.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
        console.log('pasando el map',  this.listAutor);
      })
  }
  getAutorBy(){
    // Realizo con la cadena que tenga asignada la variable (searchName) la busqueda, por nacionalidad o nombre
    //  dependiendo del valor que tenga el boolean (porNacionalidad) asignado, false = por nombre, true = por nacionalidad
    // , busco lo que tenga contenido la variable (searchName), y me suscribo.
    if(this.searchName !== ''){
      this.autorService.getAutorByPropiedad(this.searchName,this.porNacionalidad).subscribe(result => {
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
    if(this.porNacionalidad == true){
       this.placeholderSearch = "Por Nombre";
      }else{
        this.placeholderSearch = "Por Nacionalidad";
      }
      this.porNacionalidad = !this.porNacionalidad;
  }

  filtrarPor(idCase){
    this.estadoBusqueda = idCase; 
      this.autorService.getByFiltro(idCase,this.searchName)
      .subscribe(result => {
        this.items = result;
        this.listAutor = result.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })     
    
    console.log('Key presed', idCase);
    console.log('Lista actualizada', this.listAutor);
  }

  deleteAutor(AutorId){
    this.autorService.deleteAutor(AutorId).then((res) => {
      console.log('Borrado exitoso', res);
    },
    (err) => {
      console.log('Error al borrar: ', err);
    })
  }

  dialogAutor(autor?){
      const dialogRef = this.dialog.open(AutorCreateComponent, {
        width: '250px',
         data: autor? JSON.parse(JSON.stringify(autor)) : this.autorService.getNewAutor()
      });
  }
}
