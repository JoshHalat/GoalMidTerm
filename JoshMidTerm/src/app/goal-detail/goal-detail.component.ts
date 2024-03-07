import { Component, Input } from '@angular/core';
import {NgIf, UpperCasePipe, Location} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Goal} from '../goal';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '../goal.service';

@Component({
  standalone: true,
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrl: './goal-detail.component.scss',
  imports: [FormsModule, NgIf, UpperCasePipe],
})
export class GoalDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private goalService: GoalService,
    private location: Location
  ) {}

  @Input() goal?: Goal;

  ngOnInit(): void {
    this.getGoal();
  }
  
  getGoal(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.goalService.getGoal(id)
      .subscribe(goal => this.goal = goal);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.goal) {
      this.goalService.updateGoal(this.goal)
        .subscribe(() => this.goBack());
    }
  }
}