import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { autor } from '../models/autor';
import { AutorService } from '../services/autor.service';
import {faGlobe,faUserTie,faBirthdayCake} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-autor-create',
  templateUrl: './autor-create.component.html',
  styleUrls: ['./autor-create.component.css']
})
export class AutorCreateComponent implements OnInit {

  title = 'Autor Nuevo';
autor:autor;
  flagEdit:boolean = false;
  //  --- FontAwesomeIcons ---
  faGlobe = faGlobe;
  faUserTie = faUserTie;
  faBirthdayCake = faBirthdayCake;
  //  --- FontAwesomeIcons ---

  constructor(private toastr: ToastrService ,private autorService:AutorService, public dialogRef: MatDialogRef<AutorCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    //Revisamos que tenga id, si tiene es que es un archivo ya con datos, por lo que es una actualizacion
    if(this.data.hasOwnProperty('id')){
      // Deslindamos los datos que llegan con los que vamos a modificar , para evitar problemas con la
      // actualizacion por referencias.
      this.autor =  JSON.parse(JSON.stringify(this.data.data));
      this.autor.anio = JSON.parse(JSON.stringify(new Date(this.autor.anio)));
      this.flagEdit= true; 
      // Si es una actualizacion cambiamos el titulo principal
      this.title = 'Actualizando autor';
    }else{
      // si no tiene id , es un objeto nuevo, por lo que eliminamos las referencias, 
      // y lo asignamos a autor para trabajar con el 
      this.autor = JSON.parse(JSON.stringify(this.data));
    }    
  }

  Save(){
    if(this.verificarCamposAutor(this.autor) == true){
      this.formatearFecha(this.autor); 
          // se inserta el autor en la bd y esperamos el resultado.
          this.autorService.createItem(this.autor).then(
            (res)=>{
            this.toastr.success('Autor guardado', 'Éxito');
            this.cerrarDialog();
          },
          (error)=> {
            this.toastr.error('Autor no pudo ser guardado', 'Error');
          })
    }else{
      this.toastr.error('No puede haber campos vacios', 'Error');
    }
    
  }

  verificarCamposAutor(autor:autor):boolean{
    if(autor.nombre !== '' && autor.anio !== null && autor.nacionalidad !== '' ){
      return true;
    }else{
      return false;
    }
  }

  updateAutor(){
    if(this.verificarCamposAutor(this.autor) == true){
      this.formatearFecha(this.autor);
      this.autorService.updateItem(this.data.id,this.autor).then((res)=>{
        this.toastr.success('Autor actualizado', 'Éxito');
        this.cerrarDialog();
      },
        (error)=> {
          this.toastr.error('Autor no pudo ser actualizado', 'Error');
        })
    }else{
      this.toastr.error('No puede haber campos vacios', 'Error');
    }

    
  }
  
  cerrarDialog(): void {
    this.dialogRef.close();
  }

  formatearFecha(Item){
     // La fecha la convertimos a milisegundos, ya que la guardamos de esa manera en firebase
    this.autor.anio = JSON.parse(JSON.stringify((new Date(Item.anio)).getTime())); 
  }

}
