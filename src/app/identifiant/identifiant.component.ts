import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { IdentifiantService } from '../shared/identifiant.service';

@Component({
  selector: 'app-identifiant',
  templateUrl: './identifiant.component.html',
  styleUrls: ['./identifiant.component.scss']
})
export class IdentifiantComponent implements OnInit {

  /* variables */

  body: User = {
    Id:0,
    UserName: '',
    Password: '',
    Email: '',
    FirstName: '',
    LastName: '',
    CNI:'',
    Immatriculation:'',
    dateNaissance:''
  }
  user_id:String;
  token:string;

  /*constructor */
  constructor(private Identifiantservice:IdentifiantService) { }

  /* les fonctionnes */

  ngOnInit() {
    this.user_id=localStorage.getItem('user_id');
    this.token=localStorage.getItem('token');
    this.Identifiantservice.getIdentifiant(this.user_id,this.token)
    .subscribe(identifiant=>{
       this.body=identifiant.data
      })
  }

}
