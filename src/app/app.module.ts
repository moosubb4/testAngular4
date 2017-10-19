import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
// Components
import { AppComponent } from "./app.component";
import { ShowComponent } from "./components/show/show.component";
import { FireShowComponent } from "./components/fire-show/fire-show.component";
import { FireAddComponent } from "./components/fire-add/fire-add.component";
// Services
import { ShowDataService } from "./services/show-data.service";
import { FireCloundService } from "./services/fire-clound.service";
// FireStore
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from "../environments/environment.prod";
// import { environment } from "../environments/environment";

const appRoutes: Routes = [
  { path: "", component: FireShowComponent },
  { path: "fire-add", component: FireAddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    FireShowComponent,
    FireAddComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [ShowDataService, FireCloundService],
  bootstrap: [AppComponent]
})
export class AppModule {}
