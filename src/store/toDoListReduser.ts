import { v1 } from "uuid"
import { FilterType } from "../App"
import { ToDoListType } from "../ToDoList"

export type StateType = {
  title: string,
  id: string,
  filter: string
}


type RemoveActionType = {
  type: 'REMOVE-TODO-LIST',
  id: string,
}

type AddActionType = {
  type: 'ADD-TODO-LIST',
  newTitle: string,
}

type ChangeTitleActionType = {
  type: 'CHANGE-TITLE',
  newTitle: string,
  id: string
}

type FilterActionType = {
  type: 'CHANGE-FILTER',
  filter: string,
  id: string
}

type ActionTypes = RemoveActionType | AddActionType | ChangeTitleActionType | FilterActionType

export const filterActionCreator = (id: string, filter: string): FilterActionType => {
  return {
    type: 'CHANGE-FILTER' as const,
    id: id,
    filter: filter,
  }
}

export const removeActionCreator = (id: string): RemoveActionType => {
  return {
    type: 'REMOVE-TODO-LIST' as const,
    id: id,
  }
}

export const addTodoActionCreator = ( newTitle: string,): AddActionType => {
  return {
    type: 'ADD-TODO-LIST' as const,
    newTitle: newTitle,
  }
}

export const changeTitleActionCreator = (newTitle: string, id: string): ChangeTitleActionType => {
  return {
    type: 'CHANGE-TITLE' as const,
    newTitle: newTitle,
    id: id
  }
}

//но так как редюсер должен быть иммутабельной функцией - не изменять то, что приходит, а делать копию и изменять ее, то мы должны создать копию
//важно писать после скобок с аргументами двоеточие и тип того, что должен вернуть редьюсер - ведь это иммутабельная функция, а значит, что мы должны вернуть ту же структуру, что получили
export const toDoListReduser = (state: Array<StateType>, action: ActionTypes): Array<StateType> => {
  switch (action.type) {
    case ('REMOVE-TODO-LIST'):
      return state.filter(el => el.id !== action.id);

    case ('ADD-TODO-LIST'):
      return [...state, {
        title: action.newTitle,
        id: v1(),
        filter: 'All'
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

      const todolistFilter = state.find(el => el.id !== action.id)
      if (todolistFilter) {
        todolistFilter.filter = action.filter
      }
      return [...state];


    default:
      throw new Error('I dont understand the action type')
  }
}