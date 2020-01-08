import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CongeService } from '../shared/conge.service';
import { Departement } from '../shared/Departement.model';
import { Interime } from '../shared/Interime.model';



@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {

  /*Declaration Variables */

  mytimestart: Date;
  mytimeend: Date ;
  typeDepartement:string='';
  typeInterime:string='';
  panelVisible: boolean = false;
  panelVisibleDate: boolean = false;
  nullValue:string='';
  registerForm: FormGroup;
  submitted = false;
  starttime: string ;
  endtime: string;
  depts: Departement;
  Interimes: Interime;
  Interimes_clone:Interime;
  error: {};
  token:string;
  success: boolean=false;
  failed: boolean=false;
  disabled: boolean=false;
  

  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder,private Congeservice:CongeService) { }

  ngOnInit() {

      this.registerForm = this.formBuilder.group({
      departement: ['', Validators.required],
      interime: ['', Validators.required],
      mytimestart: ['', Validators.required],
      mytimeend: ['', Validators.required],
      },{validator: this.dateLessThan('mytimestart', 'mytimeend')});
      
      this.recupererdata();
  
          }

  /* recuperer les departement et les interimes */
  recupererdata(){
    this.token=localStorage.getItem('token');
    this.Congeservice.getDepartements(this.token).subscribe(
      (Response: Departement) => this.depts=Response.data,
      error => this.error = error
    );
    this.Congeservice.getInterimes(this.token).subscribe(
      (Response: Interime) => this.Interimes=Response.data.filter(
        Interim => Interim.id != localStorage.getItem('user_id')),
      error => this.error = error
    );

  }

   //comparer deux date */
    dateLessThan(from: string, to: string) {
      return (group: FormGroup): {[key: string]: any} => {
        let f = group.controls[from];
        let t = group.controls[to];
        if (f.value > t.value){
          return {
            dates: "Date from should be less than Date to"
          };
        }
        return {};
      }
    }


  get f() { return this.registerForm.controls; }

  /*submitter le formulaire du template */
  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if(this.registerForm.invalid){
    
        return;
    }else{
      this.starttime=this.datePipe.transform(this.mytimestart,"dd-MM-yyyy");
      this.endtime=this.datePipe.transform(this.mytimeend,"dd-MM-yyyy");
      
      alert(this.typeDepartement+'-'+this.typeInterime+'-'+this.starttime+'-'+this.endtime)
    }
}

  validerConge(){
    console.log(this.typeDepartement);
  }

  updateSelectedValue(event:string): void{
    if(this.typeDepartement!=this.nullValue){
      this.panelVisible=true;
      this.Interimes_clone = this.Interimes.filter(
      Interim => Interim.Departement_value == this.typeDepartement);
    }else{
      this.panelVisible=false
      this.panelVisibleDate=false;
        }
  }

  updateSelectedValueInterim(event:string): void{
    if(this.typeInterime!=this.nullValue){
      this.panelVisibleDate=true;                     
    }else{
      this.panelVisibleDate=false;
         }
  }

}
