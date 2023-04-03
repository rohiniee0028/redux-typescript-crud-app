export interface ITodo {
    id : string,
    title ?: string,
    status ?: boolean
}

export interface ITodoobj {
    id : string,
    title ?: string,
    status ?: boolean
}

export interface ITodoDataReducer {
    isLoading: boolean;
    isError: boolean;
    todoData: ITodo[];
}

export interface ITodoAction {
    type: string;
    payload?: ITodo[];
}

export interface ITodoPost {
    title : string,
    status : boolean
}


