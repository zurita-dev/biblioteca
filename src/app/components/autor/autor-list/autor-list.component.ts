import { Component, OnInit } from '@angular/core';
import { AutorService } from '../services/autor.service';
import {MatDialog} from '@angular/material/dialog';
import { AutorCreateComponent } from '../autor-create/autor-create.component';

@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css']
})
export class AutorListComponent implements OnInit {
  items: Array<any>;
  listAutor: any;
  constructor(private autorService: AutorService, public dialog: MatDialog) { }

  
 

  ngOnInit() {
    this.getAutores();
  }

  getAutores(){
      this.autorService.getAutores()
      .subscribe(result => {
        this.items = result;
        this.listAutor = result.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
        console.log(this.listAutor);
      })
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
