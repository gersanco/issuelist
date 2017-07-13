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
  public pages:number;
  public issuesPag:any[];
  private issuePerPage:Number;
  public repository: Repository;
  public issues:any[];
  constructor(
    private _issueService: IssueService,
    private _sharedService: SharedService
  ) {
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
    let url = `${this.repository.owner}/${this.repository.rep}/issues?state=all`;
    this._issueService.getIssues(url).subscribe(
      resp => {
        this.issues = resp;
        if(this.issues.length > 0) {
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
          console.log(this.issuesPag)
          this.issues = this.issuesPag[0].issues;
        }
        console.log(this.issues)
      }, err => {
        console.log(err);
      }
    )
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

}
