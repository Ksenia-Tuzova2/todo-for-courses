import { ThunkAction } from "redux-thunk"
import { todoApi } from "../api/todoApi"

import { taskRequestThunk} from "./tasksReduser"

export type StateTodoType = {
  title: string,
  id: string,
  filter: FilterType,
  addedDate: string,
  order: number,
}

export type FilterType = 'All' | 'Active' | 'Completed'


let inititialState: Array<StateTodoType> = []

type ActionTypes = ReturnType<typeof changeFilterAc> | ReturnType<typeof removeTodoAC> | ReturnType<typeof addTodoAC> | ReturnType<typeof changeTodoTitleAC> | ReturnType<typeof setTodoData>


export const setTodoData = (data: any) => {
  return {
    type: 'SET_DATA',
    data: data
  } as const
}

export const todoDataRequest = (): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any): void {
    todoApi.getTodoRequest().then((data: any) => {
      dispatch(setTodoData(data))
      console.log(data)
      data.forEach((todo: StateTodoType) => {
        dispatch(taskRequestThunk(todo.id))
      });
    })
  }
}

export const changeFilterAc = (id: string, filter: FilterType) => {
  return {
    type: 'CHANGE-FILTER' as const,
    id: id,
    filter: filter,
  } as const
}

export const removeTodoAC = (id: string) => {
  return {
    type: 'REMOVE-TODO-LIST' as const,
    id: id,
  } as const
}

export const removeTodoRequest = (todoId: string): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any) {
    todoApi.deleteTodoRequest(todoId).then((data: any) => {
      if (data.resultCode === 0) {
        dispatch(removeTodoAC(todoId))
      }
    })
  }
}




export const addTodoAC = (item: StateTodoType) => {
  return {
    type: 'ADD-TODO-LIST' as const,
    title: item.title,
    id: item.id,
    addedDate: item.addedDate,
    order: item.order,
  } as const
}



export const addTodoRequest = (title: string): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any): void {
    todoApi.createTodoRequest(title).then((Response: any) => {
      if (Response.resultCode === 0) {
        dispatch(addTodoAC(Response.data.item))
      }
    })
  }
}

export const changeTodoTitleAC = (newTitle: string, id: string) => {
  return {
    type: 'CHANGE-TITLE' as const,
    newTitle: newTitle,
    id: id
  } as const
}

//важно писать после скобок с аргументами двоеточие
// и тип того, что должен вернуть редьюсер - ведь это иммутабельная функция, а значит, что мы должны вернуть ту же структуру, что получили

export const toDoListReduser = (state: Array<StateTodoType> = inititialState, action: ActionTypes): Array<StateTodoType> => {
  switch (action.type) {
    
    case ('SET_DATA'):
      return [...action.data]

    case ('REMOVE-TODO-LIST'):
      return state.filter(el => el.id !== action.id);

    case ('ADD-TODO-LIST'):
      return [...state, {
        title: action.title,
        id: action.id,
        filter: 'All',
        addedDate: action.addedDate,
        order: action.order
      }]

    case ('CHANGE-TITLE'):
      //не работает
      const todolist = state.find(el => el.id === action.id)
      if (todolist) {
        console.log(todolist.title = action.newTitle);

        todolist.title = action.newTitle;
      }
      return [...state];

    case ('CHANGE-FILTER'):
      return state.map(todo => {
        if(todo.id !== action.id) return todo
        return {...todo, filter: action.filter}
      })


    default:
      return state
  }
}


