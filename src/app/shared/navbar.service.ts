import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible: boolean;
  IsAdmin:string='1';
  IsAdminState:boolean;

  constructor() { this.visible = true; }
  

  hide() {
     this.visible = false; }
  show() {
     if(localStorage.getItem('isadmin')==this.IsAdmin){
       this.IsAdminState=true;
      }
     else{
       this.IsAdminState=false
     }
     this.visible = true;
     }

}
