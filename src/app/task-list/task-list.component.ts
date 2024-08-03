import { Component, HostListener, OnInit } from '@angular/core';
import { CurdServiceService } from '../curd-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  todos: any[] = [];
  ImagePath: string;

  checked: any;

  constructor(private curdService: CurdServiceService) {
    this.ImagePath= '../logo.png'
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.curdService.getTodos().subscribe(response => {
      this.todos = response.slice(0, 20); // Display only the first 20 items
      localStorage.setItem('todos', JSON.stringify(this.todos));
    });
  }

  addTodo(title: string): void {
    const newTodo = { title, completed: false };
    this.curdService.addTodo(newTodo).subscribe(response => {
      this.todos.push(response);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    });
  }

  updateTodo(id: number, completed: any): void {
    completed = completed?.target?.checked
    const updatedTodo = { completed };
    this.curdService.updateTodo(id, updatedTodo).subscribe(() => {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = completed;
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    });
    this.checked = this.getChecked()

  }
  getChecked(){
    let length = 0;
    this.todos.forEach(result => {
      if(result.completed){
        length++
      }
    })
    return length;
  }

  deleteTodo(id: number): void {
    this.curdService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    });
  }
  isDropdownActive: boolean | undefined;
  toggleDropdown(): void {
    this.isDropdownActive = !this.isDropdownActive;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth > 600 && this.isDropdownActive) {
      this.isDropdownActive = false;
    }
  }
  moveUp(id: number) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index > 0) {
      [this.todos[index], this.todos[index - 1]] = [this.todos[index - 1], this.todos[index]];
    }
  }

  moveDown(id: number) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index < this.todos.length - 1) {
      [this.todos[index], this.todos[index + 1]] = [this.todos[index + 1], this.todos[index]];
    }
  }
  
}

