import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../route-animation';
import { NavbarService } from '../shared/navbar.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ slideInAnimation ]
})
export class HomeComponent implements OnInit {

  constructor(private nav:NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }

}
