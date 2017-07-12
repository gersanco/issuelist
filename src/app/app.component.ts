import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Repository } from "./models/repository";

import { SharedService  } from './services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public repository:Repository;

  constructor(private _sharedService: SharedService) {
    this.repository = new Repository("", "");
  }

  onSubmit(){
    this._sharedService.emitChange(this.repository);
  }
}
