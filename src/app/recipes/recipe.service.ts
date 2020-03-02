import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();

    
    private recipes: Recipe[] = []
    
    constructor(){}
    
    getRecipes(){
        return this.recipes.slice();
    }
    
    setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}