import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

export interface User {
  id: number;
  name: string;
  surname: string;
  age: number;
}

@Component({
  selector: "app-fire-add",
  templateUrl: "./fire-add.component.html",
  styleUrls: ["./fire-add.component.css"]
})
export class FireAddComponent implements OnInit {
  // Add
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  snapchat: any;

  addId: number;
  addName: string;
  addSurname: string;
  addAge: number;

  usersList: any;
  ids: number;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.getUsers();
    // console.log(this.getUser());
  }

  getUsers() {
    this.usersCollection = this.afs.collection("user", ref => {
      return ref.orderBy("id", "desc").limit(1);
    });
    this.users = this.usersCollection.valueChanges();
    this.users.subscribe(data => {
      this.usersList = data;
      this.ids = data[0]["id"];
      // console.log(data);
    });
  }

  addUser() {
    this.usersCollection = this.afs.collection("user");
    this.users = this.usersCollection.valueChanges();
    // const id = this.afs.createId();
    let idPlus = this.ids;
    if (isNaN(idPlus) === true) {
      console.log('"NAN" ');
      idPlus = 0;
    } else {
      console.log("");
    }
    this.usersCollection
      .add({
        id: Number(idPlus) + 1,
        name: this.addName,
        surname: this.addSurname,
        age: Number(this.addAge)
      })
      .then(_ => alert("Add Success"))
      .catch(error => console.log(error));
  }
}
