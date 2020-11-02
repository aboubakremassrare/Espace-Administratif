import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../shared/demande.service';


@Component({
  selector: 'app-avance',
  templateUrl: './avance.component.html',
  styleUrls: ['./avance.component.scss']
})
export class AvanceComponent implements OnInit {
  /*variables */

  avance:number=0;
  registerForm: FormGroup;
  submitted = false;
  demandeForm: FormGroup;
  success: boolean=false;
  failed: boolean=false;
  disabled: boolean=false;

  /*constructor */

  constructor(private formBuilder: FormBuilder,private demandeservice:DemandeService) { }

 /*function */

  ngOnInit(){
   this.registerForm = this.formBuilder.group({
     avance: ['', [Validators.required, Validators.min(1)]],
                                             });
   }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.disabled = true;
    this.submitted = true;
    const formData = new FormData();
    formData.append('sujet', 'DEMANDE D\'AVANCE');
    formData.append('user_id',localStorage.getItem('user_id'));
    formData.append('token',localStorage.getItem('token'));
    formData.append('typeDemande','AVANCE');
    formData.append('avance',''+this.avance);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.disabled = false;
        return;
    }
    else{
      this.demandeservice.sendmail(formData).subscribe(
        res => {
        },
        error =>{
          console.log(error);
        } 
      );
      this.demandeservice.createDemandeAvance(formData).subscribe(
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
