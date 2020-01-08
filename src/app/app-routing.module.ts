import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';

import { PapierComponent } from './papier/papier.component';
import { AttestationSalaireComponent } from './papier/attestation-salaire/attestation-salaire.component';
import { AttestationTravailComponent } from './papier/attestation-travail/attestation-travail.component';
import { DomiciliationSalaireComponent } from './papier/domiciliation-salaire/domiciliation-salaire.component';
import { PapierVisaComponent } from './papier/papier-visa/papier-visa.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CongeComponent } from './conge/conge.component';
import { AvanceComponent } from './avance/avance.component';
import { AutorisationComponent } from './autorisation/autorisation.component';
import { AuthGuard } from './auth/auth.guard';

/*table routage */

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: AuthentificationComponent, data: {animation: 'Login'}  },
  { path: 'home', component: HomeComponent , data: {animation: 'Home'},canActivate:[AuthGuard] },
  { path: 'papier', component: PapierComponent , data: {animation: 'Papier'},canActivate:[AuthGuard] },
  { path: 'papier/attestation-salaire', component: AttestationSalaireComponent , data: {animation: 'Attestation-salaire'},canActivate:[AuthGuard] },
  { path: 'papier/attestation-travail', component: AttestationTravailComponent , data: {animation: 'Attestation-travail'},canActivate:[AuthGuard] },
  { path: 'papier/domiciliation-salaire', component: DomiciliationSalaireComponent , data: {animation: 'Domiciliation-salaire'},canActivate:[AuthGuard] },
  { path: 'papier/papier-visa', component: PapierVisaComponent , data: {animation: 'Papier-visa'},canActivate:[AuthGuard] },
  { path: 'conge', component: CongeComponent , data: {animation: 'Conge'},canActivate:[AuthGuard] },
  { path: 'avance', component: AvanceComponent , data: {animation: 'Avance'},canActivate:[AuthGuard] },
  { path: 'autorisation', component: AutorisationComponent , data: {animation: 'Autorisation'},canActivate:[AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
