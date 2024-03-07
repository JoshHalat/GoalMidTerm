import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Goal } from './goal';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const goals = [
      { id: 12, title: 'Dr. Nice' },
      { id: 13, title: 'Bombasto' },
      { id: 14, title: 'Celeritas' },
      { id: 15, title: 'Magneta' },
      { id: 16, title: 'RubberMan' },
      { id: 17, title: 'Dynama' },
      { id: 18, title: 'Dr. IQ' },
      { id: 19, title: 'Magma' },
      { id: 20, title: 'Tornado' }
    ];
    return {goals};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the goals array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(goals: Goal[]): number {
    return goals.length > 0 ? Math.max(...goals.map(goal => goal.id)) + 1 : 11;
  }
}