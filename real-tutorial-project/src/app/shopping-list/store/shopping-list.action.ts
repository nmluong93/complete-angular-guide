import {createAction, props} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';


export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const DEL_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';


export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ payload: Ingredient }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{ payload: Ingredient [] }>()
);

export const deleteIngredient = createAction(
  DEL_INGREDIENT
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ payload: { newIngredient: Ingredient } }>()
);

export const startEdit = createAction(
  START_EDIT,
  props<{ payload: number }>()
);

export const stopEdit = createAction(
  STOP_EDIT
);
