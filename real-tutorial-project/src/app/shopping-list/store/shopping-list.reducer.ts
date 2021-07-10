import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.action';
import {createReducer, on} from '@ngrx/store';


export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}


const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export const shoppingListReducer = createReducer(initialState,
  on(ShoppingListAction.addIngredient, (state, {payload}) => {
    return {
      ...state,
      ingredients: [...state.ingredients, payload]
    };
  }),
  on(ShoppingListAction.addIngredients, (state, {payload}) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...payload]
    };
  }),
  on(ShoppingListAction.deleteIngredient, state => {
    return {
      ...state,
      ingredients: state.ingredients.filter((element, index) => index !== state.editedIngredientIndex),
      editedIngredientIndex: -1,
      editedIngredient: null
    };
  }),
  on(ShoppingListAction.updateIngredient, (state, {payload}) => {
    const index = state.editedIngredientIndex;
    const originalIngredient = state.ingredients[index];
    // copy object to new one.
    const updatedIngredient = {
      ...originalIngredient,
      ...payload.newIngredient
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[index] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredientIndex: -1,
      editedIngredient: null
    };
  }),
  on(ShoppingListAction.startEdit, (state, {payload}) => {
    return {
      ...state,
      editedIngredientIndex: payload,
      // copy ingredient into editedIngredient
      editedIngredient: {...state.ingredients[payload]}
    };
  }),
  on(ShoppingListAction.stopEdit, state => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    };
  })
);
