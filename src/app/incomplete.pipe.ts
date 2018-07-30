import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo';

@Pipe({
  name: 'incomplete'
})
export class IncompletePipe implements PipeTransform {

  transform(todos: Todo[], showAll: boolean): any {
    const results = [];

    if (showAll) {
      return todos;
    }

    todos.forEach(function(todo) {
      if (!todo.completed) {
        results.push(todo);
      }
    });

    return results;
  }

}
