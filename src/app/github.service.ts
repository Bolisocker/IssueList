import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";

@Injectable()
export class GithubService {
  //private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {
  }

  getIssuesByUrl(url: string) {
    if(url.match(new RegExp('(https://api\\.github\\.com/repos/).*(/issues$)'))){
      return this.http.get(url)
        .map(data => data.json())
        .catch(error => this.handleError(error))
    }else{
      return this.handleError(new Error("Invalid url."));
    }
  }

  getIssuesByUserRepository(user: string, repository:string) {
    var url = "https://api.github.com/repos/";
    return this.http.get(url+user+"/"+repository+"/issues")
      .map(data => data.json())
      .catch(error => this.handleError(error));
  }

  getUserInfo(user: string) {
    return this.http.get("https://api.github.com/users/" + user)
      .map(data => data.json())
      .catch(error => this.handleError(error))
  }

  getUserRepositories(user: string) {
    return this.http.get("https://api.github.com/users/" + user + "/repos")
      .map(data => data.json())
      .catch(error => this.handleError(error))
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
