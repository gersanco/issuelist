import { Component, OnInit } from '@angular/core';
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
  public repository: Repository;
  public issues:any[];
  constructor(
    private _issueService: IssueService,
    private _sharedService: SharedService
  ) {
    _sharedService.changeEmitted$.subscribe(
      resp => {
        this.repository = resp;
        this.getIssues();
    });
  }

  ngOnInit() {
  }

  getIssues() {
    let url = `${this.repository.owner}/${this.repository.rep}/issues`;
    this._issueService.getIssues(url).subscribe(
      resp => {
        this.issues = resp;
        console.log(this.issues)
      }, err => {
        console.log(err);
      }
    )
  }

}
