import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PapierComponent } from './papier/papier.component';
import { AttestationSalaireComponent } from './papier/attestation-salaire/attestation-salaire.component';
import { AttestationTravailComponent } from './papier/attestation-travail/attestation-travail.component';
import { DomiciliationSalaireComponent } from './papier/domiciliation-salaire/domiciliation-salaire.component';
import { PapierVisaComponent } from './papier/papier-visa/papier-visa.component';
import { CongeComponent } from './conge/conge.component';
import { AutorisationComponent } from './autorisation/autorisation.component';
import { AvanceComponent } from './avance/avance.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { IdentifiantComponent } from './identifiant/identifiant.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './shared/auth.service';
import { httpInterceptorProviders } from './http-interceptors/index';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PapierComponent,
    AttestationSalaireComponent,
    AttestationTravailComponent,
    DomiciliationSalaireComponent,
    PapierVisaComponent,
    CongeComponent,
    AutorisationComponent,
    AvanceComponent,
    NavbarComponent,
    AuthentificationComponent,
    IdentifiantComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [DatePipe,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
