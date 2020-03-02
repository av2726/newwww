import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  username: string;
  verifyForm: FormGroup;
  constructor(
  private route: ActivatedRoute,private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    //console.log(this.route.snapshot.queryParamMap.get("username"));
    this.username=this.route.snapshot.queryParamMap.get("username");
    this.initForm();
  }

  onVerify(){
    const username = this.verifyForm.value.username;
    const verifycode = this.verifyForm.value.verifycode;
    this.store.dispatch(new AuthActions.TryVerify({username:username,verifycode:verifycode}));
  }
  
  private initForm(){
    this.verifyForm = new FormGroup({
      'username' : new FormControl(this.username, Validators.required),
      'verifycode':new FormControl('',Validators.required)
    });
    //console.log(this.verifyForm);
  }

}
