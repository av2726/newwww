import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';

import * as RecipeActions from './recipe.actions';
import { switchMap, map, take, tap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$.pipe(
            ofType(RecipeActions.FETCH_RECIPES),
            switchMap((action: RecipeActions.FetchRecipes)=>{
                 return this.http
                      .get<Recipe[]>(
                        'https://ng-recipe-book-60224.firebaseio.com/recipes.json', 
                        {observe: 'body',responseType:'json'}
                      )
            }),
            map(recipes => {
           recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
          
          return {
              type : RecipeActions.SET_RECIPES,
              payload : recipes
          }
        })
        );
    
    @Effect({dispatch:false})
    recipeStore = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
            const req = new HttpRequest('PUT','https://ng-recipe-book-60224.firebaseio.com/recipes.json',state.recipes
      ,{reportProgress: true});
        return this.http.request(req);
        })
        );
    
    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromRecipe.FeatureState>){}

    
}