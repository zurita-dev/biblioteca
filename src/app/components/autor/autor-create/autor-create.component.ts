import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { autor } from '../models/autor';
import { AutorService } from '../services/autor.service';
import {faGlobe,faUserTie,faBirthdayCake} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-autor-create',
  templateUrl: './autor-create.component.html',
  styleUrls: ['./autor-create.component.css']
})
export class AutorCreateComponent implements OnInit {

  title = 'Autor Nuevo';
autor:autor;
  flagEdit:boolean = false;
  faGlobe = faGlobe;
  faUserTie = faUserTie;
  faBirthdayCake = faBirthdayCake;

  constructor(private autorService:AutorService, public dialogRef: MatDialogRef<AutorCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    console.log(this.data);
    if(this.data.hasOwnProperty('id')){
      console.log('Si tiene ID');
      this.autor =  JSON.parse(JSON.stringify(this.data.data));
      this.autor.anio = JSON.parse(JSON.stringify(new Date(this.autor.anio)));
      this.flagEdit= true; 
    }else{
      console.log('No tiene ID'); 
      this.autor = JSON.parse(JSON.stringify(this.data));
    }    
  }

  Save(){
    this.autor.anio = JSON.parse(JSON.stringify((new Date(this.autor.anio)).getTime())); 
    console.log('Este autor es el que se va a guardar: ', this.autor);
    this.autorService.createAutor(this.autor).then((res)=>{
       console.log('Éxito', res);
    },
    (error)=> {
      console.log('Error: ', error);
    })
  }

  updateAutor(){
     this.autor.anio = JSON.parse(JSON.stringify((new Date(this.autor.anio)).getTime())); 
    this.autorService.updateAutor(this.data.id,this.autor).then((res)=>{
      console.log('Éxito', res);
   },
   (error)=> {
     console.log('Error: ', error);
   })
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
