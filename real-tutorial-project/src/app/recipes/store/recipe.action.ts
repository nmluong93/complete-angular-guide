import {createAction, props, union} from '@ngrx/store';
import {Recipe} from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = 'Recipes] Fetch recipes';
export const ADD_RECIPE = '[Recipes] Add recipe';
export const UPDATE_RECIPE = '[Recipes] Update recipe';
export const DELETE_RECIPE = '[Recipes] Delete recipe';
export const STORE_RECIPES = '[Recipes] Store recipes';

export const setRecipes = createAction(
  SET_RECIPES,
  props<{ payload: Recipe[] }>()
);

export const fetchRecipes = createAction(
  FETCH_RECIPES
);

export const addRecipe = createAction(
  ADD_RECIPE,
  props<{ payload: Recipe }>()
);

export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{
    payload: {
      index: number,
      recipe: Recipe
    }
  }>()
);

export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ payload: number }>()
);

export const storeRecipes = createAction(
  STORE_RECIPES
);

export const allAction = union({
  setRecipes,
  fetchRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  storeRecipes
});

export type recipeActions = typeof allAction;
