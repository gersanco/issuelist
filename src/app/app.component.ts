import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Repository } from "./models/repository";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public repository:Repository;

  constructor() {
    this.repository = new Repository("", "");

  }

  onSubmit(){
    console.log('Pulsado');
    console.log(this.repository);
  };
}
