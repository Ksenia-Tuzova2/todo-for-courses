import { ThunkAction } from "redux-thunk"
import { v1 } from "uuid"
import { todoApi } from "../api/todoApi"
import { FilterType } from "../App"
import { ToDoListType } from "../components/toDoList/ToDoList"
import { TasksType } from "./tasksReduser"

export type StateTodoType = {
  title: string,
  id: string,
  filter: string,
  addedDate: string,
  order: number,
}




export let toDoListId1 = v1()
export let toDoListId2 = v1()

let inititialState: Array<StateTodoType> = [
  // {
  //   title: 'js',
  //   id: toDoListId1,
  //   filter: 'All',
  //   addedDate: "2019-07-30T12:24:15.063",
  //   order: 0
  // },
  // {
  //   title: 'js',
  //   id: toDoListId2,
  //   filter: 'All',
  //   addedDate: "2019-07-30T12:24:15.063",
  //   order: 0
  // }
]

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
      console.log(data);
      
      dispatch(setTodoData(data))
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

type ItemType = {
  id: string,
  addedDate: string,
  order: number,
  title: string,
}


export const addTodoAC = (item: ItemType) => {
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
    todoApi.postTodoRequest(title).then((data: any) => {
      if (data.resultCode === 0) {
        

        dispatch(addTodoAC(data.item))
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

//но так как редюсер должен быть иммутабельной функцией - не изменять то, что приходит, а делать копию и изменять ее, то мы должны создать копию
//важно писать после скобок с аргументами двоеточие и тип того, что должен вернуть редьюсер - ведь это иммутабельная функция, а значит, что мы должны вернуть ту же структуру, что получили
export const toDoListReduser = (state: Array<StateTodoType> = inititialState, action: ActionTypes): Array<StateTodoType> => {
  switch (action.type) {
    
    case ('SET_DATA'):
      // debugger
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
      console.log('from reducer AC');
      
      //let todo = state.find((todo: StateTodoType) => 
      //todo.id === action.id)

      //if (todo){
        //{...todo}filter = action.filter
//}
      
      //return [...state,];
      return state.map(todo => {
        if(todo.id !== action.id) return todo
        return {...todo, filter: action.filter}
      })


    default:
      return state
  }
}


