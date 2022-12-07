import { act } from "@testing-library/react"
import { v1 } from "uuid"
import { FilterType } from "../App"
import { ToDoListType } from "../ToDoList"
import { TasksListsType } from "./tasksReduser.test"

export type StateType = {
  [key: string]: TasksListsType
}


type RemoveActionType = {
  type: 'REMOVE-TASK',
  toDoId: string,
  taskId: string
}

type addTaskActionType = {
  type: 'ADD-TASK',
  toDoId: string
  newTitle: string,
}

type changeFilterActionType = {
  type: 'CHANGE-FILTER',
 
  toDoId: string,
  taskId: string,
  newFilter: boolean
}
type changeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
 
  toDoId: string,
  taskId: string,
  newName: string
}


type ActionTypes = RemoveActionType | addTaskActionType|changeFilterActionType |changeTaskTitleActionType


export const removeTaskActionCreator = (toDoId: string, taskId: string): RemoveActionType => {
  return {
    type: 'REMOVE-TASK' as const,
    toDoId: toDoId,
    taskId: taskId
  }
}

export const addTaskActionCreator = (newTitle: string, toDoId: string): addTaskActionType => {
  return {
    type: 'ADD-TASK' as const,
    newTitle: newTitle,
    toDoId: toDoId,
  }
}

export const changeFilterActionCreator = (newFilter: boolean, toDoId: string,taskId: string): changeFilterActionType => {
  return {
    type: 'CHANGE-FILTER' as const,
    toDoId: toDoId,
    taskId: taskId,
    newFilter:newFilter
  }
}

export const changeTaskTitleActionCreator = (newName:string, toDoId: string,taskId: string): changeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE' as const,
    toDoId: toDoId,
    taskId: taskId,
    newName :newName,
}
}


//но так как редюсер должен быть иммутабельной функцией - не изменять то, что приходит, а делать копию и изменять ее, то мы должны создать копию
//важно писать после скобок с аргументами двоеточие и тип того, что должен вернуть редьюсер - ведь это иммутабельная функция, а значит, что мы должны вернуть ту же структуру, что получили
export const tasksReducer = (state: TasksListsType, action: ActionTypes): TasksListsType => {
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
    default:
      throw new Error('I dont understand the action type')
  }
}