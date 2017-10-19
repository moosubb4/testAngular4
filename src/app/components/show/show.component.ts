import { Component, OnInit } from '@angular/core';
import { ShowDataService } from '../../services/show-data.service';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  private todoList: Todo;
  private userList: User;

  constructor(private showdataService: ShowDataService) { }

  ngOnInit() {
    // Call services
    this.showdataService.getTodoList().subscribe((res) => {
      this.todoList = res;
      console.log(res);
    });

    this.getUser();
  }

  addTodo() {
    this.showdataService.getTodoList().subscribe((res) => {
      console.log(res);
    });
    return false;
  }

  getUser() {
    this.showdataService.getUser().subscribe((res) => {
      this.userList = res;
    });
  }

  addSkill() {
    this.showdataService.addUser().subscribe((res) => {
      console.log(res);
      this.getUser();
    });
    return false;
  }

}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  surname: string;
  age: number;
}
