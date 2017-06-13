import { Component } from '@angular/core';
import { GithubService } from './github.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GithubService]
})
export class AppComponent {
  searchOpt = 'url';
  repositoryUrl;
  issues;
  user = {};
  userName = null;
  repositories = null;
  page = 1;
  error;
  selectedRepository = '';
  status = 'done';

  constructor(private githubService: GithubService) {
  }


  getIssueListByUrl(): void {
    this.status = 'loading';
    this.error = null;
    this.githubService.getUserInfo(this.getUsernameFromUrl())
      .subscribe(
      data =>
        this.user = data
      )
      ;
    this.getRepositoryNameFromUrl();
    this.githubService.getIssuesByUserRepository(this.getUsernameFromUrl(), this.selectedRepository)
      .subscribe(
      data => {
        this.error = null;
        this.issues = data;
        this.getRepositoryNameFromUrl();
        this.status = 'done';
      },
      err => {
        this.error = err;
        this.status = 'done';
      }
      );

  }

  getIssueListByUserRepository(): void {
    this.status = 'loading';
    this.error = null;
    this.issues = null;
    this.githubService.getUserInfo(this.userName)
      .subscribe(
      data => this.user = data
      );
    this.githubService.getIssuesByUserRepository(this.userName, this.selectedRepository)
      .subscribe(
      data => {
        this.issues = data;
        this.status = 'done';
      },
      err => {
        this.error = err;
        this.status = 'done';
      }
      );

  }

  getUsernameFromUrl(): string {
    // Get user name from url
    let userName = this.repositoryUrl.substring(this.repositoryUrl.indexOf('.com') + 5);
    userName = userName.substr(0, userName.indexOf('/'));
    return userName;
  }

  getRepositoryNameFromUrl() {
    // Get repository name from url
    this.selectedRepository = this.repositoryUrl.substring(this.repositoryUrl.indexOf('.com') + 6 + this.getUsernameFromUrl().length);
    this.selectedRepository = this.selectedRepository.substr(0);

  }

  getUserRepositories() {
    if (this.userName != null) {
      this.issues = null;
      this.selectedRepository = '';
      this.repositories = null;
      this.error = null;
      this.githubService.getUserRepositories(this.userName)
        .subscribe(
        data => {
          this.repositories = data;
        },
        err => {
          this.error = err;
        }
        );
    }
  }


}
