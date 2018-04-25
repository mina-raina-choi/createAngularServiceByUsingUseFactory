import { Injectable } from '@angular/core';
import { Todo, AccessService } from './access.service';

@Injectable()
export class AccessByAService implements AccessService {
  sharedValue: number = 10;
  getTodos(): Todo[] {
    const todos: Todo[] = [
      {
        title: 'secret',
        description: 'All of my deepest, darkest secrets.',
        done: false
      }
    ];

    return todos;
  }
}
