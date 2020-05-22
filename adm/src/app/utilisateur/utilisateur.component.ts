import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { CongeService } from '../shared/conge.service';
import { Departement } from '../shared/departement.model';



@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {


  submitted = false;
  registerForm: FormGroup;
  typeDepartement:string='';
  naissance: Date; 
  NaissanceDate:string;
  nom:string;
  prenom:string;
  username:string;
  password:string;
  immatriculation:string;
  email:string;
  cin:string;
  isadmin:string;
  success: boolean=false;
  failed: boolean=false;
  token:string;
  depts: Departement;
  error: {};


  constructor(private Congeservice:CongeService,private datePipe: DatePipe,private formBuilder: FormBuilder,private authservice:AuthService) 
  { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      immatriculation: ['', Validators.required],
      cin: ['', Validators.required],
      naissance: ['', Validators.required],
      email: ['', Validators.required],
      isadmin:[''],
      departement: ['', Validators.required],
                                            });
         
      this.recupererdata();
  }

    /* recuperer les departement et les interimes */
    recupererdata(){
      this.token=localStorage.getItem('token');
      this.Congeservice.getDepartements(this.token).subscribe(
        (Response: Departement) => this.depts=Response.data,
        error => this.error = error
      );
    
  
    }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    this.NaissanceDate=this.datePipe.transform(this.naissance,"dd-MM-yyyy");

    const formData = new FormData();
    formData.append('Nom', this.nom);
    formData.append('Prenom', this.prenom);
    formData.append('username', this.username);
    formData.append('password',''+this.password);
    formData.append('Immatriculation',this.immatriculation);
    formData.append('Cin',this.cin);
    formData.append('Naissance',this.NaissanceDate);
    formData.append('email',this.email);
    formData.append('IsAdmin',this.isadmin);
    formData.append('departement', this.typeDepartement);
    formData.append('token',localStorage.getItem('token')); 

    this.authservice.createUtilisateur(formData).subscribe(
      res => {
        this.success=true;
        this.failed=false;  
        this.reset();
      },
      error =>{
        console.log(error);
        this.failed=true;
        this.success=false;
     
      } 
    );
              }

    //function reset
    reset(){
     this.nom='';
     this.prenom='';
     this.username='';
     this.password='';
     this.immatriculation='';
     this.cin='';
     this.email='';
     this.typeDepartement=''
    }

}
