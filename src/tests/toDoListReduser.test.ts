import { v1 } from "uuid"
import { addTodoAC, changeFilterAc, changeTodoTitleAC, FilterType, removeTodoAC, setTodoData, StateTodoType, toDoListReduser } from "../store/toDoListReduser"

let toDoListId1 = v1()
let toDoListId2 = v1()
let toDoListId3 = v1()
let toDoListId4 = v1()

let startState: Array<StateTodoType> = [
  {
    title: 'ew',
    id: toDoListId1,
    filter: 'All',
    addedDate: 'string',
    order: 0,
  },
  {
    title: 'yakon',
    id: toDoListId2,
    filter: 'All',
    addedDate: 'string',
    order: 0,
  },
  {
    title: 'mrs hollywood',
    id: toDoListId3,
    filter: 'All',
    addedDate: 'string',
    order: 0,
  },
  {
    title: 'test drive',
    id: toDoListId4,
    filter: 'All',
    addedDate: 'string',
    order: 0,
  }
]


beforeEach(() => {

  let startState: Array<StateTodoType> = [
    {
      title: 'ew',
      id: toDoListId1,
      filter: 'All',
      addedDate: 'string',
      order: 0,
    },
    {
      title: 'yakon',
      id: toDoListId2,
      filter: 'All',
      addedDate: 'string',
      order: 0,
    },
    {
      title: 'mrs hollywood',
      id: toDoListId3,
      filter: 'All',
      addedDate: 'string',
      order: 0,
    },
    {
      title: 'test drive',
      id: toDoListId4,
      filter: 'All',
      addedDate: 'string',
      order: 0,
    }
  ]

})


test('set todo list from  empty array', () => {
  const action = setTodoData(startState)
  const endState = toDoListReduser([], action)

  expect(endState.length).toBe(4)
})



test('delete todo list', () => {


  const action = removeTodoAC(toDoListId4)
  const endState = toDoListReduser(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[2].id).toBe(toDoListId3)

})



test('add todolist', () => {

  let newItem: StateTodoType = {
    title: 'ew',
    id: toDoListId1,
    filter: 'All',
    addedDate: 'string',
    order: 0,
  }

  const action = addTodoAC(newItem)

  const endState: Array<StateTodoType> = toDoListReduser(startState, action)

  expect(endState.length).toBe(5)
  expect(endState[4]).not.toBe(undefined)
  expect(endState[4].title).toBe('ew')
})




test('change title ', () => {

  let newToDoListTitle = 'new title'
  const action = changeTodoTitleAC(newToDoListTitle, toDoListId1)
  const endState: Array<StateTodoType> = toDoListReduser(startState, action)

  expect(endState[0].title).toBe(newToDoListTitle)
})



test('change filter ', () => {

  let newToDoListFilter: FilterType = 'Completed'

  const action = changeFilterAc(toDoListId1, newToDoListFilter)
  const endState: any = toDoListReduser(startState, action)

  expect(endState[0].filter).toBe('Completed')
})

// double click? 

