import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GithubService {
  constructor(private http: Http) {
  }


  getIssuesByUserRepository(user: string, repository: string) {
    const url = 'https://api.github.com/repos/';
    return this.http.get(url + user + '/' + repository + '/issues')
      .map(data => data.json())
      .catch(error => this.handleError(error));
  }

  getUserInfo(user: string) {
    return this.http.get('https://api.github.com/users/' + user)
      .map(data => data.json())
      .catch(error => this.handleError(error))
  }

  getUserRepositories(user: string) {
    return this.http.get('https://api.github.com/users/' + user + '/repos')
      .map(data => data.json())
      .catch(error => this.handleError(error))
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
