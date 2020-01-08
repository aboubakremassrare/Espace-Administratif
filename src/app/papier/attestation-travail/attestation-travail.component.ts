import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../shared/demande.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-attestation-travail',
  templateUrl: './attestation-travail.component.html',
  styleUrls: ['./attestation-travail.component.scss'],
 
})
export class AttestationTravailComponent implements OnInit  {

 constructor(private formBuilder: FormBuilder,private demandeservice:DemandeService,private router:Router) { }



 selectedOption: string='2';
 registerForm: FormGroup;
 submitted = false;
 demandeForm: FormGroup;
 success: boolean=false;
 failed: boolean=false;
 disabled: boolean=false;

 ngOnInit(){
  this.registerForm = this.formBuilder.group({
    select: ['', Validators.required],

});
  }



  validerAttTravail(){

    console.log('attestation de travail');
    console.log(this.selectedOption);

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
    sendmailData.append('sujet', 'ATTESTATION DE Travail');
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
