import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorListComponent } from './components/autor/autor-list/autor-list.component';
import { LibroListComponent } from './components/libros/libro-list/libro-list.component';


const routes: Routes = [
  { path: 'libros', component: LibroListComponent },
  { path: 'autores', component: AutorListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
