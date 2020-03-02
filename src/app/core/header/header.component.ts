import { Component, OnInit} from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRecipe from '../../recipes/store/recipe.reducers'
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';


@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})

export class HeaderComponent implements OnInit{
    constructor(private store: Store<fromRecipe.FeatureState>){}
    authState : Observable<fromAuth.State>;
    
    ngOnInit(){
        this.authState = this.store.select('auth');
    }
    onSaveData(){
        this.store.dispatch(new RecipeActions.StoreRecipes());    
    }
    
    
  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  
  onLogout(){
      this.store.dispatch(new AuthActions.Logout());
  }
}