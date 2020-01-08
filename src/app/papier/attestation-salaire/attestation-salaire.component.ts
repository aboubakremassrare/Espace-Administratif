import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../shared/demande.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-attestation-salaire',
  templateUrl: './attestation-salaire.component.html',
  styleUrls: ['./attestation-salaire.component.scss'],
 
})
export class AttestationSalaireComponent implements OnInit  {



 selectedOption: string='1';
 registerForm: FormGroup;
 submitted = false;
 demandeForm: FormGroup;
 success: boolean=false;
 failed: boolean=false;
 disabled: boolean=false;



 constructor(private formBuilder: FormBuilder,private demandeservice:DemandeService,private router:Router) { }


 ngOnInit(){
  this.registerForm = this.formBuilder.group({
    select: ['', Validators.required],
         });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.disabled = true;
    const formData = new FormData();
    formData.append('attestation_id', this.selectedOption);
    formData.append('user_id',localStorage.getItem('user_id'));
    formData.append('token',localStorage.getItem('token'));
    //envoyer un mail
    const sendmailData = new FormData();
    sendmailData.append('sujet', 'ATTESTATION DE SALAIRE');
    sendmailData.append('user_id',localStorage.getItem('user_id'));
    sendmailData.append('token',localStorage.getItem('token'));
    sendmailData.append('typeDemande','ATTESTATION');
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.disabled = false;
        return;
    }
    else{
      this.demandeservice.sendmail(sendmailData).subscribe(
        res => {
        },
        error =>{
          console.log(error);
        } 
      );
      this.demandeservice.createDemande(formData).subscribe(
        res => {
              this.success=true;
              this.failed=false;  
              this.disabled=false;
        },
        error =>{
          console.log(error);
          this.failed=true;
          this.success=false;
          this.disabled=false

        } 
      );
     
    }
  
}



}
