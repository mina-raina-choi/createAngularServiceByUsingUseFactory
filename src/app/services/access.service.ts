import { Injectable } from '@angular/core';

export interface Todo {
  title: string;
  description: string;
  done: boolean;
}

@Injectable()
export abstract class AccessService {
  sharedValue: number = 10;
  abstract getTodos(): Todo[];
}
