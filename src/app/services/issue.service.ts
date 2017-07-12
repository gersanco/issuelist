import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IssueService {
  public url:string;
  constructor(private _http: Http) {
    this.url = `https://api.github.com/repos/`;
  }

  getIssues(url:string){
    return this._http.get(this.url + url)
                        .map(res => res.json());
  }

}
