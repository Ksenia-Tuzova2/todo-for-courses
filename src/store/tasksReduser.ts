import { v1 } from "uuid"
import { TasksType } from "../components/toDoList/ToDoList"
import { TasksListsType } from "./tasksReduser.test"
import { toDoListId1, toDoListId2 } from "./toDoListReduser"

export type StateType = {
  [key: string]: TasksType[]
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


type ActionTypes = ReturnType<typeof deleteListActionCreator>|ReturnType<typeof removeTaskActionCreator>|ReturnType<typeof addTaskActionCreator>|ReturnType<typeof changeFilterActionCreator>|ReturnType<typeof changeFilterActionCreator>|ReturnType<typeof changeTaskTitleActionCreator>


export const removeTaskActionCreator = (toDoId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK' as const,
    toDoId: toDoId,
    taskId: taskId
  } as const
}

export const addTaskActionCreator = (newTitle: string, toDoId: string)=> {
  return {
    type: 'ADD-TASK' as const,
    newTitle: newTitle,
    toDoId: toDoId,
  } as const
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



export const deleteListActionCreator = ( toDoId: string)=> {
  return {
    type: 'DELETE-LIST' as const,
    toDoId: toDoId,
} as const
}

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