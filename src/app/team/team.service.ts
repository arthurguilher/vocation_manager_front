import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Team } from './team';

@Injectable()
export class TeamService {

    constructor(private _httpService: Http) { }

    getAllTeams(): Observable<Team[]> {
        return this._httpService.get("http://localhost:8080/team/all")
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    addTeam(team: Team) {
        let body = JSON.parse(JSON.stringify(team));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._httpService.post("http://localhost:8080/team/add", body, options);
    }

    deleteTeam(teamId: string) {
        return this._httpService.delete("http://localhost:8080/team/delete/" + teamId);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}