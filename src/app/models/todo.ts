export class Todo {
  id: number;
  task: string;
  description: string;
  completed: boolean;
  completeDate: string;

  constructor (id?: number, task?: string, description?: string, completed?: boolean) {
    this.id = id;
    this.task = task;
    this.description = description;
    this.completed = completed;
  }
}
