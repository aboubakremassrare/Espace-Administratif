import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../shared/navbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

   /* variables */

  registerForm: FormGroup;
  submitted = false;
  username:String;
  password:string;
  error: {errorTitle: '', errorDesc: ''};
  loginError: boolean=false;
  loading:boolean=false;

   /* Constructor */
  constructor(private router: Router,public nav: NavbarService,private formBuilder: FormBuilder,private authService: AuthService) { }

   /* functions */

  ngOnInit() {
    this.nav.hide();
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
                                               });

    this.authService.logout();
  }

  get f() { return this.registerForm.controls; }


/*submit le formulaire de login */
  onSubmit() {
    this.submitted = true;
    this.loading=true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.loading=false;
        return;
    }
 

    this.authService.login(this.username, this.password).subscribe((data) => {
      if (this.authService.isLoggedIn) {
         this.router.navigate(['/home']);
       } 
       else{
        this.loginError = true;
        this.loading=false;
       }
    },
    (err : HttpErrorResponse)=>{
      this.loginError = true;
      this.loading=false;
    });
   
            }//end submit

}
