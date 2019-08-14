import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Employee } from './employee';

@Injectable()
export class EmployeeService {

    constructor(private _httpService: Http) { }

    getAllEmployees(): Observable<Employee[]> {
        return this._httpService.get("http://localhost:8080/employee/all")
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    addEmployee(employee: Employee) {
        let body = JSON.parse(JSON.stringify(employee));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const params = new URLSearchParams();
        params.append('teamId', employee.teamId);
        let options = new RequestOptions({ headers: headers, params: params });
        return this._httpService.post("http://localhost:8080/employee/add", body, options);
    }

    deleteEmployee(employeeId: string) {
        return this._httpService.delete("http://localhost:8080/employee/delete/" + employeeId);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}