import { Component, OnInit } from '@angular/core';
import { IssuePage } from "../../models/issue-page";
import { Repository } from "../../models/repository";
import { IssueService } from '../../services/issue.service';
import { SharedService  } from '../../services/shared.service';
@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  providers: [IssueService]
})
export class IssueListComponent implements OnInit {
  public totalIssues:Number;
  public pages:number;
  public issuesPag:any[];
  private issuePerPage:Number;
  public repository: Repository;
  public issues:any[];
  public error:any;
  constructor(
    private _issueService: IssueService,
    private _sharedService: SharedService
  ) {
    // this.issues = [];
    this.totalIssues = 0;
    this.pages = 1;
    this.issuePerPage = 8;
    this.issuesPag = [];
    _sharedService.changeEmitted$.subscribe(
      resp => {
        this.repository = resp;
        this.getIssues();
    });
  }

  ngOnInit() {
  }

  getIssues() {
    let url = `${this.repository.owner}/${this.repository.rep}/issues?state=all&page=1&per_page=1000`;
    this._issueService.getIssues(url).subscribe(
      resp => {
        this.error= null;
        this.issues = resp;
        this.getIssuesPerPage(2);
        console.log(this.issues)
      }, err => {
        console.log(err);
        this.error = JSON.parse(err._body);
        console.log(this.error)
      }
    )
  }

  getIssuesPerPage(page) {
    let url = `${this.repository.owner}/${this.repository.rep}/issues?state=all&page=${page}&per_page=1000`;
    this._issueService.getIssues(url).subscribe(
      resp => {
        page++;
        this.issues = this.issues.concat(resp);
        this.getIssuesPerPage(page);
      }, err => {
        this.totalIssues = this.issues.length;
        if(this.issues.length > 0) {
          this.issuesPag = [];
          let pag = 1;
          let issePg = new IssuePage(pag, []);
          for(let issue of this.issues) {
            issePg.issues.push(issue);
            if(issePg.issues.length == this.issuePerPage) {
              this.issuesPag.push(issePg);
              pag++;
              issePg = new IssuePage(pag, []);
            }
          }
          this.issuesPag.push(issePg);
          console.log(this.issuesPag)
          this.issues = this.issuesPag[0].issues;
        }
      });
  }

  last() {
    this.issues = this.issuesPag[this.issuesPag.length-1].issues;
    this.pages = this.issuesPag.length;
  }

  first() {
    this.issues = this.issuesPag[0].issues;
    this.pages = 1;
  }

  setPage(pag) {
    this.issues = pag.issues;
    this.pages = pag.pag;
  }

  openIssue(issue) {
    let win = window.open(issue.html_url, '_blank');
  }

}
