import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { libro, libroN } from '../models/libro';
import {LibroService} from './../services/libro.service';
import {faBookOpen,faBookReader,faCalendarCheck, faFont} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-libro-create',
  templateUrl: './libro-create.component.html',
  styleUrls: ['./libro-create.component.sass']
})
export class LibroCreateComponent implements OnInit {
  
  title = 'Libro Nuevo';
  libro:libroN;
  flagEdit:boolean = false;
  listAutor: any[] = [];
  // Iconos fontawesome
  faBookOpen = faBookOpen;
  faBookReader = faBookReader;
  faCalendarCheck = faCalendarCheck;
  faFont = faFont;
  // Iconos fontawesome


  constructor(private toastr: ToastrService, private libroService: LibroService, public dialogRef: MatDialogRef<LibroCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    // recuperamos los autores en la bd, para usarlos en el select
    this.getAutores();
    //Revisamos que tenga id, si tiene es que es un archivo ya con datos, por lo que es una actualizacion
    if(this.data.hasOwnProperty('id')){
      // Deslindamos los datos que llegan con los que vamos a modificar , para evitar problemas con la
      // actualizacion por referencias.
      this.libro =  JSON.parse(JSON.stringify(this.data.data));
      this.libro.anio = JSON.parse(JSON.stringify(new Date(this.libro.anio)));
      this.flagEdit= true; 
      // Si es una actualizacion cambiamos el titulo principal
      this.title = 'Actualizando Libro';
    }else{
      // si no tiene id , es un objeto nuevo, por lo que eliminamos las referencias, 
      // y lo asignamos a autor para trabajar con el 
      this.libro = JSON.parse(JSON.stringify(this.data));
    }
   //
    // this.libro = this.libroService.getNewLibro();
  }

  getAutores(){
    this.libroService.getAll('autor').subscribe(result => {
      // mapeo los documentos, para asignarles el id y la información propia del autor, ya que por default 
        // firebase manda los documentos con el id y la data separados.
      this.listAutor = result.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id,data}
      })
    })
  }

  Save(){
    if(this.verificarCamposLibro(this.libro) == true){
      this.libroService.formatearFecha(this.libro);
      this.libroService.createItem(this.libro).then((res)=>{
        this.toastr.success('Libro Creado', 'Éxito');
        this.cerrarDialog();
      },
      (error)=> {
        this.toastr.error('Libro no pudo ser creado', 'Error');
      })
    }else{
      this.toastr.error('No puede haber campos vacios', 'Error');
    }
    
  }

  updateLibro(){
    if(this.verificarCamposLibro(this.libro) == true){
    this.libroService.formatearFecha(this.libro);
    this.libroService.updateItem(this.data.id,this.libro).then((res)=>{
      this.toastr.success('Libro actualizado', 'Éxito');
      this.cerrarDialog();
    },
      (error)=> {
        this.toastr.error('Autor no pudo ser actualizado', 'Error');
      })
  }else{
    this.toastr.error('No puede haber campos vacios', 'Error');
  }
  }

  verificarCamposLibro(libro:libro):boolean{
    // Verificamos que el objeto sea correcto con los campos necesarios
    if(libro.titulo !== '' && libro.anio !== null && libro.autor !== '' && libro.descripcion !== '' ){
      return true;
    }else{
      return false;
    }
  }
  
  cerrarDialog(): void {
    this.dialogRef.close();
  }

}
