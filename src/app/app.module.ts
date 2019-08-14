import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { TeamService } from './team/team.service';
import { EmployeeService } from './employee/employee.service';
import { TeamComponent } from './team/team.component';
import { EmployeeComponent } from './employee/employee.component';
import { VacationComponent } from './vacation/vacation.component';
import { AppChildComponent } from './appchild.component';
import { PageNotFoundComponent } from './others/pageNotFound.component';
import { HomeComponent } from './team/home.component';
import { VacationService } from './vacation/vacation.service';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'addTeam', component: TeamComponent },
  { path: 'addEmployee', component: EmployeeComponent },
  { path: 'addVacation', component: VacationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, TeamComponent, EmployeeComponent, VacationComponent, AppChildComponent, HomeComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,  RouterModule.forRoot(appRoutes)
  ],
  providers: [TeamService, EmployeeService, VacationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
