import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../shared/demande.service';
import { CongeService } from '../shared/conge.service';
import { Departement } from '../shared/departement.model';
import { Interime } from '../shared/interime.model';
import * as jsPDF from 'jspdf'



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
  demandeForm: FormGroup;
  success: boolean=false;
  failed: boolean=false;
  disabled: boolean=false;
  

  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder,private Congeservice:CongeService,private demandeservice:DemandeService) { }

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
        Interim => Interim.user_id != localStorage.getItem('user_id')),
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
      this.disabled = true;
      // stop here if form is invalid
      if(this.registerForm.invalid){
      this.disabled = false;
        return;
      }else{
      this.starttime=this.datePipe.transform(this.mytimestart,"dd-MM-yyyy");
      this.endtime=this.datePipe.transform(this.mytimeend,"dd-MM-yyyy");
      const formData = new FormData();
      formData.append('sujet', 'CONGE');
      formData.append('departement', this.typeDepartement);
      formData.append('interime', this.typeInterime);
      formData.append('datedebut', this.starttime);
      formData.append('datefin',''+this.endtime);
      formData.append('user_id',localStorage.getItem('user_id'));
      formData.append('token',localStorage.getItem('token'));
      formData.append('typeDemande','CONGE');
      this.demandeservice.sendmail(formData).subscribe(
        res => {
        },
        error =>{
          console.log(error);
        } 
      );
      this.demandeservice.createDemandeConge(formData).subscribe(
        res => {
          /*creer le pdf */
          var conge = new jsPDF()
          const htmlcontent='<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><style>table {border-collapse:collapse;width:90%;}th, td {border:1px solid black;width:20%;}td {text-align:center;}</style></head><body><h2 align="center">FORMULAIRE DE CONGE</h2><br><h5 style="float:left; border: 1px solid black; padding: 5px;">DEMANDE : Conge</h5><br><br><br><h5>Nom et Prénom :'+res.data.Nom+' '+res.data.Prenom +' &nbsp;&nbsp;</h5><p>Departement :'+res.data.Departement+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Sollicite l\'autorisation de s\'absenter :</p><p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Du :'+res.data.Datedebut+'</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Au : '+res.data.Datefin+'</p><br><br><br><p>  Intérim :'+res.data.Interime+' </p><p style="float:right;">Date & Signature<br><br></p></body></html>';
          conge.fromHTML(htmlcontent, 10, 10);
          conge.save('conge.pdf');
          this.success=true;
          this.failed=false;  
          this.disabled=false;
          this.panelVisible= false;
          this.panelVisibleDate= false;
       
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
