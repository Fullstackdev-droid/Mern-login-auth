import {
    SET_CURRENT_USER,
    USER_ADD,
    USER_REGISTER,
} from "../actions/types";
const isEmpty =require("is-empty")
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};
export default function(state = initialState, action) {
    switch (action.type) {
        case USER_REGISTER:
            return {
                ...state,
                newuser: action.payload
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}
