import {createContext, useEffect, useReducer} from 'react'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../../utils/firebase/utilis';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const INITIAL_STATE = {
    currentUser: null,
};

const userReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }    
        default:
            throw new Error(`unhandled type ${type} in user reducer`);
    }
}

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const {currentUser} = state;
    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }

    const value = {currentUser, setCurrentUser};

useEffect(() => {
    const unSubscribe = onAuthStateChangedListener((user) =>{
        if(user) {
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
    });
    return unSubscribe;
}, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};  