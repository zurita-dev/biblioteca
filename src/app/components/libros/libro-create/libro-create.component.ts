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

  constructor(private libroService: LibroService, public dialogRef: MatDialogRef<LibroCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: libro) { }

  ngOnInit() {
    this.libro = this.libroService.getNewLibro();
  }

  Save(){
    // this.libroService.newLibro(this.libro). then((res)=>{
    //   console.log('Éxito', res);
    // },
    // (error)=> {
    //   console.log('Error: ', error);
    // })
  }

  

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
