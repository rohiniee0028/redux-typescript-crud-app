import { ITodoAction, ITodoDataReducer } from "../../@types/ItodoData"
import { TodoTypes } from "./ActionTypes";

const initialState: ITodoDataReducer = {
    isLoading: false,
    isError: false,
    todoData: [],
}

export const TodoDataReducer = (state = initialState, action: ITodoAction) => {
    switch (action.type) {
        case TodoTypes.GET_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                todoData: action.payload
            }
        case TodoTypes.POST_TODO_SUCCESS:
            console.log("post-state", state);
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        case TodoTypes.DELETE_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        case TodoTypes.PUT_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,  
            }
        case TodoTypes.PATCH_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                
            }
        case TodoTypes.TODO_LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case TodoTypes.TODO_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}