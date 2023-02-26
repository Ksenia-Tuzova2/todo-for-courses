import { v1 } from "uuid"

export type StateType = {
  title: string,
  id: string,
  filter: string
}

export let toDoListId1 = v1()
export let toDoListId2 = v1()




let inititialState=[
  { title: 'js',
    id: toDoListId1,
    filter: 'all'
  },
  { title: 'js',
    id: toDoListId2,
    filter: 'all'
  }
]

type ActionTypes = ReturnType<typeof changeFilterAc>|ReturnType<typeof removeTodoAC>|ReturnType<typeof addTodoAC>|ReturnType<typeof changeTodoTitleAC>


export const changeFilterAc = (id: string, filter: string)=> {
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

export const addTodoAC = ( newTitle: string)=> {
  return {
    type: 'ADD-TODO-LIST' as const,
    newTitle: newTitle,
    id: v1(),
  } as const
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
export const toDoListReduser = (state: Array<StateType>=inititialState, action: ActionTypes): Array<StateType> => {
  switch (action.type) {
    case ('REMOVE-TODO-LIST'):
      return state.filter(el => el.id !== action.id);

    case ('ADD-TODO-LIST'):
      return [...state, {
        title: action.newTitle,
        id: action.id,
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
      return state
  }
}