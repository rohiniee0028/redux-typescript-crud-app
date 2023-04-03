import {
    applyMiddleware,
    combineReducers,
    legacy_createStore,
  } from "redux";

import thunk from "redux-thunk";
import { TodoDataReducer } from "./TodoReducer/Reducer";

  
  const rootReducer = combineReducers({
    todo:TodoDataReducer
  });
  
  export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
  
  export type AppState = ReturnType<typeof rootReducer>;
  