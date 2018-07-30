import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../todo.service';
import { IncompletePipe } from '../incomplete.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  title = 'ngToDO';
  selected = null;
  newTodo = new Todo();
  editTodo = null;
  todos: Todo[] = [];
  showComplete = false;

  getNumTodos() {
    return this.incomplete.transform(this.todos, false).length;
  }

  displayTodo(todo) {
    this.selected = todo;
  }

  displayTable() {
   this.selected = null;
  }

  setEditTodo() {
    this.editTodo = Object.assign({}, this.selected);
  }

  incompleteTodoWarning() {
    const incompleteTodos = this.getNumTodos();

    if (incompleteTodos >= 10) {
      return 'danger';
    } else if (incompleteTodos >= 5 && incompleteTodos < 10) {
      return 'warning';
    }
    return 'okay';
  }

  reload() {
    this.todoService.index().subscribe(
      (data) => this.todos = data,
      (err) => console.log(err)
    );
  }

  addTodo(todo: Todo, form: NgForm) {
    const newerTodo: Todo = new Todo();
    newerTodo.completed = false;
    newerTodo.description = '';
    newerTodo.task = form.value.task;

    this.todoService.create(newerTodo).subscribe(
      (data) => {
        form.reset();
        this.reload();
      },
      (err) => console.log(err)
    );
  }

  updateTodo(todo) {
    this.todoService.update(todo).subscribe(
      (data) => {
        this.reload();
        this.editTodo = null;
        this.selected = data;
      }
    );
  }

  updateTodoCompleted(todo) {
    this.todoService.update(todo).subscribe(
      (data) => {
        this.reload();
      }
    );
  }

  deleteTodo(id) {
    this.todoService.destroy(id).subscribe(
      (data) => this.reload(),
      (err) => console.log(err)
    );
  }

  constructor(private todoService: TodoService,
              private incomplete: IncompletePipe,
              private currentRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.reload();

    if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
      const id = Number(this.currentRoute.snapshot.paramMap.get('id'));
      console.log(id);

      this.todoService.show(id).subscribe(
        (data) => {
          if (!data) {
            this.router.navigateByUrl('404');
          }
          this.selected = data;
        },
        (err) => console.log(err)
      );
    }
  }

}
