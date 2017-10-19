import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ShowDataService {



  constructor(private http: Http) {
  }

  private getHeaders(): RequestOptions {
    const reqOp = new RequestOptions();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', '*');
    reqOp.headers = headers;
    return reqOp;
  }

  getTodoList() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos').map((res) => res.json());
  }

  addTodoList() {
    const data = {
      userId: 1,
      id: 99,
      title: 'yolo',
      completed: false
    };
    return this.http.post('https://jsonplaceholder.typicode.com/todos', data).map((res) => res.json());
  }

  getUser() {
    // const body = JSON.stringify({ 'foo': 'bar' });
    const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    const options = new RequestOptions({ headers: headers });
    const url = 'https://cors-anywhere.herokuapp.com/https://my-json-server.typicode.com/moosubb4/demoJson/user'; //
    const send = this.http.get(url).map((res) => res.json());
    // console.log(JSON.stringify(send) + '<br/>' + url + '<br/>' + JSON.stringify(options));
    return send;
  }

  addUser() {
    const e = {
      id: 5,
      name: 'Joey',
      surname: 'boys',
      age: 35
    };
    const url = 'https://cors-anywhere.herokuapp.com/https://my-json-server.typicode.com/moosubb4/demoJson/user';
    return this.http.post(url, e).map((res) => res.json());
  }

}
