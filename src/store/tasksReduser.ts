import { ThunkAction } from "redux-thunk"
import { v1 } from "uuid"
import { taskApi } from "../api/tasksApi"
import { TasksType } from "../components/toDoList/ToDoList"
import { toDoListId1, toDoListId2 } from "./toDoListReduser"

export type StateType = {
  [key: string]: TasksType[]
}

export type DataType={
  id: number,
  email: string,
  login: string,
}



let initialState={
      [toDoListId1]: [
          {
              task: 'js',
              id: v1(),
              description: 'something',
              checked: true,
          },
          {
              task: 'sccs',
              id: v1(),
              description: 'something',
              checked: true,
          },
          {
              task: 'html',
              id: v1(),
              description: 'something',
              checked: false,
          },
      ], 
      [toDoListId2]: [
        {
            task: 'js',
            id: v1(),
            description: 'something',
            checked: true,
        },
        {
            task: 'sccs',
            id: v1(),
            description: 'something',
            checked: true,
        },
        {
            task: 'html',
            id: v1(),
            description: 'something',
            checked: false,
        },
    ]
    }


type ActionTypes = ReturnType<typeof deleteListActionCreator>|ReturnType<typeof removeTaskActionCreator>|ReturnType<typeof addTaskAC>|ReturnType<typeof changeFilterActionCreator>|ReturnType<typeof changeFilterActionCreator>|ReturnType<typeof changeTaskTitleActionCreator>


export const removeTaskActionCreator = (toDoId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK' as const,
    toDoId: toDoId,
    taskId: taskId
  } as const
}

export const removeTaskRequest=(toDoId: string, taskId: string):ThunkAction<void,{},{},any>=>{
  return function (dispatch:any):void{
    taskApi.deleteTaskRequest(toDoId, taskId).then((data:any)=>{
      if (data.resultCode===0){
        dispatch(removeTaskActionCreator(toDoId, taskId))
      }
    })
  }
}


export const addTaskAC = (newTitle: string, toDoId: string)=> {
  return {
    type: 'ADD-TASK' as const,
    newTitle: newTitle,
    toDoId: toDoId,
  } as const
}

export const addTaskRequest=(title:string, todoId:any):ThunkAction<void, {},{},any>=>{
  return function(dispatch:any):void{
    taskApi.postTaskRequest(title,todoId).then((data:any)=>{
      if (data.resultCode===0){
        dispatch(addTaskAC(data.title, data.todoId))
      }
    })
  }
}



export const changeFilterActionCreator = (newFilter: boolean, toDoId: string,taskId: string)=> {
  return {
    type: 'CHANGE-FILTER' as const,
    toDoId: toDoId,
    taskId: taskId,
    newFilter:newFilter
  }as const
}



export const changeTaskTitleActionCreator = (newName:string, toDoId: string,taskId: string)  => {
  return {
    type: 'CHANGE-TASK-TITLE' as const,
    toDoId: toDoId,
    taskId: taskId,
    newName :newName,
}
}

// export const changeTaskTitleRequest=(newName:string, toDoId: string,taskId: string):ThunkAction<void, {},{},any>=>{
// return function (dispatch:any)=>{
//  return {}
// }
// }

export const deleteListActionCreator = ( toDoId: string)=> {
  return {
    type: 'DELETE-LIST' as const,
    toDoId: toDoId,
} as const
}

//ПЕРЕДЕЛАТЬ ЭТИ АК В САНКИ



//но так как редюсер должен быть иммутабельной функцией - не изменять то, что приходит, а делать копию и изменять ее, то мы должны создать копию
//важно писать после скобок с аргументами двоеточие и тип того, что должен вернуть редьюсер - ведь это иммутабельная функция, а значит, что мы должны вернуть ту же структуру, что получили

export  const tasksReducer = (state: StateType=initialState, action: ActionTypes): StateType => {
  switch (action.type) {
    case ('REMOVE-TASK'):
      let stateCopy = { ...state }
      let tasks = stateCopy[action.toDoId]
      let filtreTasks = tasks.filter((t) => t.id !== action.taskId)
      stateCopy[action.toDoId] = filtreTasks
      return { ...stateCopy }

    case ('ADD-TASK'):
      let newTask = {
        task: action.newTitle,
        id: v1(),
        description: 'something',
        checked: false,
      }
      return { ...state, [action.toDoId]: [newTask, ...state[action.toDoId]] }
    case ('CHANGE-FILTER'):
   let newValue= !action.newFilter
  
      return {
        ...state, [action.toDoId]: state[action.toDoId].map(task => {
                return task.id === action.taskId ? { ...task, checked:newValue } : task
            })
    }
    case ('CHANGE-TASK-TITLE'):
     return {
        ...state, [action.toDoId]: state[action.toDoId].map(task => {
                return task.id === action.taskId ? { ...task, task:action.newName } : task
            })
    }
      case ('DELETE-LIST'):
      let copyState2={...state}
      delete copyState2[action.toDoId]
        return copyState2
      
    default:
      return state
  }
}