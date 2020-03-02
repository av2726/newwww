import { Component, OnInit } from '@angular/core';
//import * as firebase from 'firebase';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature='recipe';
  
  onNavigate(feature: string){
    this.loadedFeature =feature;
  }
  
  ngOnInit(){
    /*firebase.initializeApp({
      apiKey: "AIzaSyBjzcpgy0XeBC3ysp-W94vOkdrJrrjYqKg",
  authDomain: "ng-recipe-book-60224.firebaseapp.com"
    });*/
    Amplify.configure(awsconfig);
  }
}
