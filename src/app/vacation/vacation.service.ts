import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Vacation } from './vacation';

@Injectable()
export class VacationService {

    constructor(private _httpService: Http) { }

    getAllVacations(): Observable<Vacation[]> {
        return this._httpService.get("http://localhost:8080/vacation/all")
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    addVacation(vacation: Vacation) {
        let body = JSON.parse(JSON.stringify(vacation));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const params = new URLSearchParams();
        params.append('employeeId', vacation.employeeId);
        let options = new RequestOptions({ headers: headers, params: params });
        return this._httpService.post("http://localhost:8080/vacation/add", body, options);
    }

    deleteVacation(vacationId: string) {
        return this._httpService.delete("http://localhost:8080/vacation/delete/" + vacationId);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}