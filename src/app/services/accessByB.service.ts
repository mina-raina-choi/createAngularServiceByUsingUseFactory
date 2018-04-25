import { Injectable } from '@angular/core';
import { Todo, AccessService } from './access.service';

@Injectable()
export class AccessByBService implements AccessService {
  sharedValue: number = 10;
  getTodos(): Todo[] {
    const todos: Todo[] = [
      {
        title: 'get groceries',
        description: 'eggs, milk, etc.',
        done: false
      }
    ];

    return todos;
  }
}
