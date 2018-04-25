import { Component, OnInit, Injector, EventEmitter, ReflectiveInjector } from '@angular/core';
import { AccessByAService } from './services/accessByA.service'
import { AccessByBService } from './services/accessByB.service'
import { Todo } from './services/access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  changedPrivate: EventEmitter<any> = new EventEmitter<any>();
  todos: Todo[];
  todoListService: any;
  isPrivate: boolean = false;

  constructor(private injector: Injector) { }

  ngOnInit() {

    this.changedPrivate.subscribe(() => {
      this.injector = ReflectiveInjector.resolveAndCreate([
        {
          provide: "todoListService",
          useFactory: () => {
            if (this.isPrivate) return new AccessByAService();
            else return new AccessByBService();
          }
        },
      ]);
      this.todoListService = this.injector.get("todoListService");

      console.log(this.todoListService, this.isPrivate, this.todoListService.getTodos(), this.todoListService.sharedValue); 
    });

    this.injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: "todoListService",
        useFactory: () => {
          if (this.isPrivate) return new AccessByAService();
          else return new AccessByBService();
        }
      },
    ]);

    this.todoListService = this.injector.get("todoListService");
    const testService = this.injector.get("todoListService");
    console.log("싱글톤 체크", this.todoListService == testService)
    this.getTodos();
    console.log(this.todoListService, this.todoListService.getTodos(), this.todoListService.sharedValue); 
  }

  getTodos() {
    this.todos = this.todoListService.getTodos();
  }

  changePrivate() {
    this.isPrivate = !this.isPrivate;
    this.changedPrivate.emit({});
    this.getTodos();
  }

  addNumber() {
    this.todoListService.sharedValue += 1;
    console.log(this.todoListService.sharedValue)
  }

}
