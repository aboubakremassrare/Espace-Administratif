import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../shared/demande.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-papier-visa',
  templateUrl: './papier-visa.component.html',
  styleUrls: ['./papier-visa.component.scss'],

})
export class PapierVisaComponent implements OnInit {

  //myDateValue: Date;
  panelVisible: boolean = false;
  checks: any = [
    'Oui',
    'Non',
  ];
  mytimestart:Date;
  mytimeend:Date;
  starttime:string ;
  endtime: string;
  registerForm: FormGroup;
  submitted = false;

  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder,private demandeservice:DemandeService,private router:Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      mytimestart: ['', Validators.required],
      mytimeend: ['', Validators.required],
  
  }, {validator: this.dateLessThan('mytimestart', 'mytimeend')}
  );
  }
  //comparer deux date */
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
    const formData = new FormData();
    formData.append('attestation_id','4');
    formData.append('user_id',localStorage.getItem('user_id'));
    formData.append('token',localStorage.getItem('token'));
    this.submitted = true;
    // stop here if form is invalid
    if(this.panelVisible){
      if (this.registerForm.invalid) {
        return;
      }
    this.starttime=this.datePipe.transform(this.mytimestart,"dd-MM-yyyy");
    this.endtime=this.datePipe.transform(this.mytimeend,"dd-MM-yyyy");
    alert( this.starttime+'-'+this.endtime);
    }
    else{
      this.demandeservice.createDemande(formData).subscribe(
        res => {
            this.router.navigate(['/home']);
        },
        error => console.log(error.errorDesc)
      );
    }
 
}

  //event handler for the radio button's change event
radioChangeHandler (event: any) {
    //update the ui
    if(event.target.value=='Oui'){
      this.panelVisible=true;
    }
    else{
      this.panelVisible=false
    }
  }

//Apres submit formulaire
  // ValiderPapier(){
  //   if(this.panelVisible){

  //     console.log('oui')
  //     console.log(this.datePipe.transform(this.mytimestart,"dd-MM-yyyy"));
  //     console.log(this.datePipe.transform(this.mytimeend,"dd-MM-yyyy"));
  //   }
  //   else{
  //     console.log('non')
  //     console.log('')
  //   }


  // }

}
