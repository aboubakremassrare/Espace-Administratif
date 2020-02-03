import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {


  submitted = false;
  registerForm: FormGroup;
  naissance: Date=new Date(); 
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


  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder,private authservice:AuthService) { }

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
   
                                            });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    this.NaissanceDate=this.datePipe.transform(this.naissance,"dd-MM-yyyy");
    alert(this.isadmin)

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
    //this.reset()
              }

    //function reset
    reset(){
      this.registerForm.reset();
    }

}
