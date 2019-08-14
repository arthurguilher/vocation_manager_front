import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VacationService } from './vacation.service';
import { Vacation } from './vacation';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';

@Component({
    selector: 'app-vacation',
    templateUrl: './vacation.component.html',
    styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {

    vacations: Vacation[];
    employees: Employee[];
    employeeId: string;
    statusMessage: string;
    vacation = new Vacation();

    constructor(private _vacationService: VacationService, private _employeeService: EmployeeService,
        private _router: Router) { }

    ngOnInit(): void {
        this.getVacations();
        this.getEmployees();
    }

    onChange(employeeId:string) {
        this.vacation.employeeId = employeeId;
    }

    getEmployees(): void {
        this._employeeService.getAllEmployees()
            .subscribe((employeeData) => this.employees = employeeData,
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problema com o serviço.";
                }
            );

    }

    getVacations(): void {
        this._vacationService.getAllVacations()
            .subscribe((vacationData) => this.vacations = vacationData,
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problema com o serviço.";
                }
            );

    }

    addVacation(): void {
        debugger
        this._vacationService.addVacation(this.vacation)
            .subscribe((response) => { console.log(response); this.getVacations(); this.reset(); },
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problema com o serviço.";
                }
            );
    }

    private reset() {
        this.vacation.id = null; 
        this.vacation.startDate = null;
        this.vacation.endDate = null;
    }

    deleteVacation(vacationId: string) {
        this._vacationService.deleteVacation(vacationId)
            .subscribe((response) => { console.log(response); this.getVacations(); },
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problema com o serviço.";
                });
    }
}