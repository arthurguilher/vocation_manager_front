import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TeamService} from './team.service';
import {Team} from './team';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{

    teams: Team[];
    statusMessage: string;
    team = new Team();
    
    constructor(private _teamService: TeamService,
                private _router: Router){}

    ngOnInit(): void {
        this.getTeams();
    }

    getTeams(): void{
        debugger
        this._teamService.getAllTeams()
            .subscribe((teamData) => this.teams = teamData,
            (error) =>{
                console.log(error);
                this.statusMessage = "Problema com o serviço.";
            }
        );
        
    }

    addTeam(): void{
        this._teamService.addTeam(this.team)
            .subscribe((response) => {console.log(response); this.getTeams();this.reset();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problema com o serviço.";
            }
        );   
    }

    private reset(){
        this.team.id = null;
        this.team.name = null;
    }

    deleteTeam(teamId: string){
        this._teamService.deleteTeam(teamId)
            .subscribe((response) => {console.log(response); this.getTeams();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problema com o serviço.";
            });
            this.reset();
    }
}