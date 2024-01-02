import { createAction } from "../../utils/reducer/reducerAction";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);