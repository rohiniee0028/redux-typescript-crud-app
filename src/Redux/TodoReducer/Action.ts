import axios from "axios";
import { TodoTypes } from "./ActionTypes";
import { Dispatch } from "react";
import { ITodo, ITodoAction, ITodoPost } from "../../@types/ItodoData";

export const postTodoData = (obj: ITodo) => async (dispatch: Dispatch<ITodoAction>) => {
   dispatch({ type: TodoTypes.TODO_LOADING });
   try {
      let response = await axios.post('https://crud-backend-nhhk.onrender.com/todo', obj)
      let data = await response.data;
      dispatch({ type: TodoTypes.POST_TODO_SUCCESS});
   }
   catch (err) {
      dispatch({ type: TodoTypes.TODO_ERROR });
   }
}

export const getAllTodo = () => async (dispatch: Dispatch<ITodoAction>) => {
   dispatch({ type: TodoTypes.TODO_LOADING });
   try {
      let response = await axios.get('https://crud-backend-nhhk.onrender.com/todo');
      let data = await response.data;
      dispatch({ type: TodoTypes.GET_TODO_SUCCESS, payload: data });
   }
   catch (err) {
      dispatch({ type: TodoTypes.TODO_ERROR });
   }
}

export const deleteData = (id:string) => async (dispatch: Dispatch<ITodoAction>) => {
   dispatch({ type: TodoTypes.TODO_LOADING });
   try {
      let response = await axios.delete(`https://crud-backend-nhhk.onrender.com/todo/${id}`)
      let data = await response.data;
      dispatch({ type: TodoTypes.DELETE_TODO_SUCCESS});
   }
   catch (err) {
      dispatch({ type: TodoTypes.TODO_ERROR });
   }
}

export const updateData = (id:string, obj : ITodoPost) => async (dispatch: Dispatch<ITodoAction>) => {
   dispatch({ type: TodoTypes.TODO_LOADING });
   try {
      let response = await axios.patch(`https://crud-backend-nhhk.onrender.com/todo/${id}`,obj)
      let data = await response.data;
      dispatch({ type: TodoTypes.PUT_TODO_SUCCESS});
   }
   catch (err) {
      dispatch({ type: TodoTypes.TODO_ERROR });
   }
}

export const toggleStatus = (id:string, status : (boolean | undefined)) => async (dispatch: Dispatch<ITodoAction>) => {
   dispatch({ type: TodoTypes.TODO_LOADING });
   try {
      let response = await axios.patch(`https://crud-backend-nhhk.onrender.com/todo/${id}`,{
         status : !status
      })
      let data = await response.data;
      dispatch({ type: TodoTypes.PATCH_TODO_SUCCESS});
   }
   catch (err) {
      dispatch({ type: TodoTypes.TODO_ERROR });
   }
}