import { Component } from '@angular/core';
import { Goal } from '../goal';
//import {GOALS} from '../mock-goals';
import { /* . . . */ NgFor, /* . . . */} from '@angular/common';
import { /* . . . */ FormsModule, /* . . . */} from '@angular/forms';
import { /* . . . */ NgIf, /* . . . */} from '@angular/common';
import { /* . . . */ UpperCasePipe, /* . . . */} from '@angular/common';
import { GoalDetailComponent } from '../goal-detail/goal-detail.component';
import { GoalService } from '../goal.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    GoalDetailComponent,
    RouterModule
  ],
})

export class GoalsComponent {
  constructor(private goalService: GoalService/*, private messageService: MessageService*/) {}
  ngOnInit(): void {
    this.getGoals();
  }
  
  goals: Goal[] = [];


getGoals(): void {
  this.goalService.getGoals()
      .subscribe(goals => this.goals = goals);
}

add(title: string): void {
  title = title.trim();
  if (!title) { return; }
  this.goalService.addGoal({ title } as Goal)
    .subscribe(goal => {
      this.goals.push(goal);
    });
}

delete(goal: Goal): void {
  this.goals = this.goals.filter(h => h !== goal);
  this.goalService.deleteGoal(goal.id).subscribe();
}
}