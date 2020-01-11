import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { libro } from '../models/libro';
import {LibroService} from './../services/libro.service';

@Component({
  selector: 'app-libro-create',
  templateUrl: './libro-create.component.html',
  styleUrls: ['./libro-create.component.sass']
})
export class LibroCreateComponent implements OnInit {
  
  title = 'Libro Nuevo';
  libro:libro;
  flagEdit:boolean = false;

  constructor(private libroService: LibroService, public dialogRef: MatDialogRef<LibroCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    console.log(this.data);
    if(this.data.hasOwnProperty('id')){
      console.log('Si tiene ID');
      this.libro =  JSON.parse(JSON.stringify(this.data.data));
      this.libro.anio = JSON.parse(JSON.stringify(new Date(this.libro.anio)));
      this.flagEdit= true; 
    }else{
      console.log('No tiene ID'); 
      this.libro = JSON.parse(JSON.stringify(this.data));
    }
   //
    // this.libro = this.libroService.getNewLibro();
  }

  Save(){
    this.libro.anio = JSON.parse(JSON.stringify((new Date(this.libro.anio)).getTime())); 
    console.log('Este libro es el que se va a guardar: ', this.libro);
    this.libroService.newLibro(this.libro).then((res)=>{
       console.log('Éxito', res);
    },
    (error)=> {
      console.log('Error: ', error);
    })
  }

  updateLibro(){
     this.libro.anio = JSON.parse(JSON.stringify((new Date(this.libro.anio)).getTime())); 
    

    this.libroService.updateLibro(this.data.id,this.libro).then((res)=>{
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
