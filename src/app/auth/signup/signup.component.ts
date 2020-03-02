import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,
  private route: ActivatedRoute,private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignUp(form : NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignup({username:email,password:password}))
    //this.route.params.
    this.router.navigate(['/verify'],  {
      queryParams: {
        username: email      },
      queryParamsHandling: 'merge',
    });
  }
}
