import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibroListComponent } from './components/libros/libro-list/libro-list.component';
import { AutorListComponent } from './components/autor/autor-list/autor-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LibroListComponent,
    AutorListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
