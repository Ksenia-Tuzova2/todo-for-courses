import { ThunkAction } from "redux-thunk"
import { taskApi } from "../api/tasksApi"
import { addTodoAC } from "./toDoListReduser"

export enum StatusTaskType {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum PriorityTaskType {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TasksType = {
  id: string,
  description: string,
  title: string,
  completed: boolean,
  status: StatusTaskType,
  priority: PriorityTaskType,
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


type ActionTypes = ReturnType<typeof deleteListAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC> |
  ReturnType<typeof changeChecBoxAC> |
  ReturnType<typeof changeTaskTitleAC> |
  ReturnType<typeof setTasks> | ReturnType<typeof addTodoAC>

export const setTasks = (data: Array<TasksType>, toDoId: string) => {
  return {
    type: 'SET_TASKS',
    data,
    toDoId,
  } as const
}

export const taskRequestThunk = (
  toDoId: string
): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any): void {

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
    toDoId,
    taskId,
  } as const
}

export const removeTaskRequest = (
  toDoId: string,
  taskId: string
): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any): void {
    taskApi.deleteTaskRequest(toDoId, taskId)
      .then((data: any) => {
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

export const addTaskRequest = (
  title: string,
  todoId: string,
): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any): void {
    taskApi.сreateTaskRequest(title, todoId).then((data: any) => {

      if (data.resultCode === 0) {
        dispatch(addTaskAC(data.data.item, todoId))
      }
    })
  }
}

export const changeChecBoxAC = (newFilter: boolean, toDoId: string, taskId: string) => {

  return {
    type: 'CHANGE-CHECKBOX' as const,
    toDoId,
    taskId,
    newFilter
  } as const
}

export const changeTaskTitleAC = (
  newName: string,
  toDoId: string,
  taskId: string) => {

  return {
    type: 'CHANGE-TASK-TITLE' as const,
    toDoId,
    taskId,
    newName,
  }

}

export const changeTaskTitleRequest = (
  toDoId: string,
  taskId: string,
  newName: string
): ThunkAction<void, {}, {}, any> => {
  return function (dispatch: any) {
    taskApi.updateTaskRequest(toDoId, taskId, newName
    ).then((data: any) => {
      dispatch(changeTaskTitleAC(toDoId, taskId, newName))
    })
  }
}

//меняем чекбокс для таски
// export const changeTaskCheckBoxRequest = (
//   toDoId: string,
//   taskId: string,
//   status: StatusTaskType
// ): ThunkAction<void, {}, {}, any> => {

//   return function (dispatch: any) {

//     //собираем здесь таску 
//     let task:TasksType={
//       id: taskId,
//       description: 'there is no description yet';
//       title: string;
//       completed: boolean;
//       status: StatusTaskType;
//       priority: PriorityTaskType;
//       startDate: string;
//       deadline: string;
//       todoListId: string;
//       order: number;
//       addedDate: string;
//   }


//     taskApi.updateTaskRequest(
//       todolistId,
//       taskId,
//       title,
//       description,
//       completed,
//       status,
//       priority,
//       startDate,
//       deadline
//     ).then((data: any) => {
//       dispatch(changeChecBoxAC(newFilter, toDoId, taskId))
//     })
//   }
// }

export const deleteListAC = (toDoId: string) => {
  return {
    type: 'DELETE-LIST' as const,
    toDoId: toDoId,
  } as const
}


//но так как редюсер должен быть иммутабельной функцией 
//- не изменять то, что приходит, //а делать копию и изменять ее, то мы должны создать копию
//важно писать после скобок с аргументами двоеточие и тип того, что должен вернуть редьюсер - ведь это иммутабельная функция, а значит, что мы должны вернуть ту же структуру, что получили

export const tasksReducer = (
  state: StateTasksType = initialState,
  action: ActionTypes
): StateTasksType => {
  switch (action.type) {

    case ('ADD-TODO-LIST'):
      return { ...state, [action.id]: [] }

    case ('SET_TASKS'):
      return { ...state, [action.toDoId]: action.data }

    case ('REMOVE-TASK'):
      let stateCopy = { ...state }
      let tasks = stateCopy[action.toDoId]
      let filtreTasks = tasks.filter((t) => t.id !== action.taskId)
      stateCopy[action.toDoId] = filtreTasks
      return { ...stateCopy }

    case ('ADD-TASK'):
      return {
        ...state, [action.toDoId]: [action.newTask,
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