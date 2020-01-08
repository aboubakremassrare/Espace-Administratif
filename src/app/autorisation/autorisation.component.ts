import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../shared/demande.service';





@Component({
  selector: 'app-autorisation',
  templateUrl: './autorisation.component.html',
  styleUrls: ['./autorisation.component.scss']
})
export class AutorisationComponent implements OnInit {

 /*variables */

  mytime: Date ;
  mytimestart: Date=new Date(); 
  mytimeend: Date = new Date();
  jourtime:string;
  starttime:string;
  endtime:string;
  motif:String ;
  registerForm: FormGroup;
  submitted = false;
  isDisabled = false;
  demandeForm: FormGroup;
  success: boolean=false;
  failed: boolean=false;
  disabled: boolean=false;

   /*constructor */

  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder,private demandeservice:DemandeService) { }


   /* Functions */

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      motif: ['', Validators.required],
      mytime: ['', Validators.required],
      mytimestart: ['', Validators.required],
      mytimeend: ['', Validators.required],
                                            });
  }

  
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.disabled = true;
    if (this.registerForm.invalid) {
      this.disabled = false;
        return;
    }
    this.isDisabled = true;
    this.jourtime=this.datePipe.transform(this.mytime,"dd-MM-yyyy");
    this.starttime=this.datePipe.transform(this.mytimestart,"HH:mm");
    this.endtime=this.datePipe.transform(this.mytimeend,"HH:mm");
    const formData = new FormData();
    formData.append('sujet', 'Autorisation de sortie');
    formData.append('jour', this.jourtime);
    formData.append('heureDebut', this.starttime);
    formData.append('heureFin', this.endtime);
    formData.append('motif',''+this.motif);
    formData.append('user_id',localStorage.getItem('user_id'));
    formData.append('token',localStorage.getItem('token'));
    formData.append('typeDemande','AUTORISATION');
    this.demandeservice.sendmail(formData).subscribe(
      res => {
      },
      error =>{
        console.log(error);
      } 
    );
    this.demandeservice.createDemandeAutorisation(formData).subscribe(
      res => {
        this.success=true;
        this.failed=false;  
        this.disabled=false;
        this.reset();
      },
      error =>{
        console.log(error);
        this.failed=true;
        this.success=false;
        this.disabled=false
      } 
    );

              }

    //function reset
    reset(){
      this.mytime=new Date(); 
      this.mytimestart=new Date(); 
      this.mytimeend= new Date();
      this.motif=''
    }

}
