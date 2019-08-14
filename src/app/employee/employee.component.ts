import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { Team } from '../team/team';
import { TeamService } from '../team/team.service';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

    employees: Employee[];
    teams: Team[];
    teamId: string;
    statusMessage: string;
    employee = new Employee();

    constructor(private _employeeService: EmployeeService, private _teamService: TeamService,
        private _router: Router) { }

    ngOnInit(): void {
        this.getEmployees();
        this.getTeams();
    }

    onChange(teamId:string) {
        this.employee.teamId = teamId;
    }

    getTeams(): void {
        this._teamService.getAllTeams()
            .subscribe((teamData) => this.teams = teamData,
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problema com o serviço.";
                }
            );

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

    addEmployee(): void {
        debugger
        this._employeeService.addEmployee(this.employee)
            .subscribe((response) => { console.log(response); this.getEmployees(); this.reset(); },
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problema com o serviço.";
                }
            );
    }

    private reset() {
        this.employee.id = null;
        this.employee.name = null;
        this.employee.addressComplement = null;
        this.employee.addressNumber = null;
        this.employee.birthday = null;
        this.employee.city = null;
        this.employee.hiringDate = null;
        this.employee.neighborhood = null;
        this.employee.state = null;
        this.employee.street = null;
    }

    deleteEmployee(employeeId: string) {
        this._employeeService.deleteEmployee(employeeId)
            .subscribe((response) => { console.log(response); this.getEmployees(); },
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problema com o serviço";
                });
        this.reset();
    }
}