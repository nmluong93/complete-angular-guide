import {createReducer, on} from '@ngrx/store';
import {Recipe} from '../recipe.model';
import * as recipeAction from './recipe.action';

export interface State {
  recipes: Recipe[];
}

export const initialState: State = {
  recipes: []
};

export const recipeReducer = createReducer(initialState,
  on(recipeAction.setRecipes, (state, {payload}) => {
    return {
      ...state,
      recipes: [...payload]
    };
  }),
  on(recipeAction.addRecipe, (state, {payload}) => {
    return {
      ...state,
      recipes: [...state.recipes, payload]
    };
  }),
  on(recipeAction.updateRecipe, (state, {payload}) => {
    const updatedRecipes = [...state.recipes];
    updatedRecipes[payload.index] = payload.recipe;
    return {
      ...state,
      recipes: updatedRecipes
    };
  }),
  on(recipeAction.deleteRecipe, (state, {payload}) => {
    return {
      ...state,
      recipes: state.recipes.filter((e, index) => index !== payload)
    };
  })
);
