import { ThunkAction } from "redux-thunk"
import { v1 } from "uuid"
import { taskApi } from "../api/tasksApi"
import { FilterType } from "../App"
import { toDoListId1, toDoListId2 } from "./toDoListReduser"

export type TasksType = {
  id: string,
  description: string,
  title: string,
  completed: boolean,
  status: number,
  priority: number,
  startDate: string,
  deadline: string,
  todoListId: string,
  order: number,
  addedDate: string,
}


export type StateTasksType = {
  [key: string]: TasksType[]
}

export type DataType = {
  id: number,
  email: string,
  login: string,
}


let initialState = {}


type ActionTypes = ReturnType<typeof deleteListAC> | ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof changeChecBoxAC> | ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof setTasks>

export const setTasks = (data: any, toDoId: string) => {


  return {
    type: 'SET_TASKS',
    data: data,
    toDoId: toDoId,
  } as const
}

export const taskRequestThunk = (toDoId: string): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any): void {

    console.log('task request thunk');

    taskApi.getTaskRequest(toDoId).then((data: any) => {

      if (data.data.items) {
        dispatch(setTasks(data.data.items, toDoId))
      } else if (data.data.error.lenght) {
        console.log(data.data.error[0])
      }




    })
  }
}


export const removeTaskAC = (toDoId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK' as const,
    toDoId: toDoId,
    taskId: taskId
  } as const
}



export const removeTaskRequest = (toDoId: string, taskId: string): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any): void {
    taskApi.deleteTaskRequest(toDoId, taskId).then((data: any) => {
      if (data.resultCode === 0) {
        dispatch(removeTaskAC(toDoId, taskId))
      }
    })
  }
}



export const addTaskAC = (newTask: TasksType, toDoId: string) => {
  return {
    type: 'ADD-TASK' as const,
    newTask,
    toDoId,
  } as const
}

export const addTaskRequest = (title: string, todoId: any): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any): void {
    taskApi.postTaskRequest(title, todoId).then((data: any) => {
      
      if (data.resultCode === 0) {
        console.log(data.data);

        dispatch(addTaskAC(data.data.item, todoId))
      }
    })
  }
}



export const changeChecBoxAC = (newFilter: boolean, toDoId: string, taskId: string) => {

  return {
    type: 'CHANGE-CHECKBOX' as const,
    toDoId: toDoId,
    taskId: taskId,
    newFilter: newFilter
  } as const
}



export const changeTaskTitleAC = (newName: string, toDoId: string, taskId: string) => {
  return {
    type: 'CHANGE-TASK-TITLE' as const,
    toDoId: toDoId,
    taskId: taskId,
    newName: newName,
  }
}

export const changeTaskTitleRequest = (toDoId: string, taskId: string, newName: string): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any) {
    taskApi.putTaskRequest(toDoId, taskId, newName).then((data: any) => {

      //зачем нужна проверка на резалт код ноль, если зен не выполнится все равно,если резалт код будет другой?
      //или дата придет в любом случае, просто там будет резалт код не ноль и это сойдет за дату?
      dispatch(changeTaskTitleAC(toDoId, taskId, newName))
    })
  }
}

export const deleteListAC = (toDoId: string) => {
  return {
    type: 'DELETE-LIST' as const,
    toDoId: toDoId,
  } as const
}

//ПЕРЕДЕЛАТЬ ЭТИ АК В САНКИ



//но так как редюсер должен быть иммутабельной функцией - не изменять то, что приходит, а делать копию и изменять ее, то мы должны создать копию
//важно писать после скобок с аргументами двоеточие и тип того, что должен вернуть редьюсер - ведь это иммутабельная функция, а значит, что мы должны вернуть ту же структуру, что получили

export const tasksReducer = (state: StateTasksType = initialState, action: ActionTypes): StateTasksType => {
  switch (action.type) {
    case ('SET_TASKS'):
      //надо сделать надстройку над стейтом? 

      return { ...state, [action.toDoId]: action.data }

    case ('REMOVE-TASK'):
      let stateCopy = { ...state }
      let tasks = stateCopy[action.toDoId]
      let filtreTasks = tasks.filter((t) => t.id !== action.taskId)
      stateCopy[action.toDoId] = filtreTasks
      return { ...stateCopy }




    case ('ADD-TASK'):
      
      // let newTask = {
      //   title: action.newTitle,
      //   id: v1(),
      //   description: 'something',
      //   completed: false,
      //   status: 0,
      //   priority: 0,
      //   startDate: "2019-07-30T12:24:15.063",
      //   deadline: "2019-07-30T12:24:15.063",
      //   todoListId: action.toDoId,
      //   order: 0,
      //   addedDate: "2019-07-30T12:24:15.063",
      // }
      return {
        ...state, [action.toDoId]: [ action.newTask,
          ...state[action.toDoId]]
      }
    case ('CHANGE-CHECKBOX'):

      return {
        ...state, [action.toDoId]: state[action.toDoId].map(task => {
          return task.id === action.taskId ? { ...task, completed: action.newFilter } : task
        })
      }
    case ('CHANGE-TASK-TITLE'):
      return {
        ...state, [action.toDoId]: state[action.toDoId].map(task => {
          return task.id === action.taskId ? { ...task, title: action.newName } : task
        })
      }
    case ('DELETE-LIST'):
      let copyState2 = { ...state }
      delete copyState2[action.toDoId]
      return copyState2

    default:
      return state
  }
}