import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/navbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(public nav: NavbarService,private authservice:AuthService,private router :Router ) { }

  ngOnInit() {
    this.nav.show();
  }






logout(){
  
  this.authservice.logout();
    if (!this.authservice.isLoggedIn) {
       this.router.navigate(['/login']);
     } 
}


}
