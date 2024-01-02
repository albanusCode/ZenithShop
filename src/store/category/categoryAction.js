import { createAction } from "../../utils/reducer/reducerAction";
import { CATEGORIES_ACTION_TYPES } from "./categoriesTypes";

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);