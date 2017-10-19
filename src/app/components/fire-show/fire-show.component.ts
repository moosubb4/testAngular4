import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface User {
  id: number;
  name: string;
  surname: string;
  age: number;
}

export interface UserId extends User {
  ids?: string;
}

@Component({
  selector: 'app-fire-show',
  templateUrl: './fire-show.component.html',
  styleUrls: ['./fire-show.component.css']
})
export class FireShowComponent implements OnInit {

  // Show
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  // Update
  userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;

  newName: string;
  newSurname: string;
  newAge: number;
  // ref
  private userCollectionRef: AngularFirestoreCollection<User>;
  user$: Observable<UserId[]>;

  usersList: any;
  snapshot: any;
  private isEditable: boolean;

  constructor(private afs: AngularFirestore) {

    this.userCollectionRef = this.afs.collection<User>('user', ref =>
      ref.orderBy('id'));
    this.user$ = this.userCollectionRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data() as UserId;
        const ids = a.payload.doc.id;
        this.snapshot = { ids };
        return { ids, ...data };
      });
    });

  }

  // removeUser(userid: UserId) {
  //   console.log(userid.ids);
  // }

  ngOnInit() {
    this.getUser();
    // this.removeUser();
    // console.log(this.userCollectionRef.ref.doc().path);
    // console.log(this.userCollectionRef.ref.doc().path);
  }




  getUser() {
    this.usersCollection = this.afs.collection('user', ref => {
      return ref.orderBy('id');
    });
    this.users = this.usersCollection.valueChanges();
    this.users.subscribe((data) => {
      this.usersList = data;
      // console.log(data);
    });
  }

  updateUser(userid: UserId) {
    this.userDoc = this.afs.doc('user/' + userid.ids);
    this.user = this.userDoc.valueChanges();
    this.userDoc.update({
      name: this.newName,
      surname: this.newSurname,
      age: Number(this.newAge)
    });
  }

  delUser(userid: UserId) {
    this.userDoc = this.afs.doc('user/' + userid.ids);
    this.user = this.userDoc.valueChanges();
    this.userDoc.delete();
  }

  // เหลือส่งค่าให้มาที่Edit
  toggleEdit() {
    // this.isEditable = true;
    this.isEditable = !this.isEditable;
  }


}