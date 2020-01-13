import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibroListComponent } from './components/libros/libro-list/libro-list.component';
import { AutorListComponent } from './components/autor/autor-list/autor-list.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
// Imports material
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// End imports material
import { LibroCreateComponent } from './components/libros/libro-create/libro-create.component';
import { FormsModule } from '@angular/forms';
import { AutorCreateComponent } from './components/autor/autor-create/autor-create.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    LibroListComponent,
    AutorListComponent,
    LibroCreateComponent,
    AutorCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAnalyticsModule, // dynamically imports firebase/analytics
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  entryComponents: [
    LibroCreateComponent,
    AutorCreateComponent
  ],
  providers: [MatDatepickerModule,],
  bootstrap: [AppComponent]
})
export class AppModule { }
