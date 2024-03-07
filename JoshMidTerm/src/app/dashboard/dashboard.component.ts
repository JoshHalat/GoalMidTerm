import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  goals: Goal[] = [];

  constructor(private goalService: GoalService) { }

  ngOnInit(): void {
    this.getGoals();
  }

  getGoals(): void {
    this.goalService.getGoals()
      .subscribe(goals => this.goals = goals.slice(1, 5));
  }
}