import { v1 } from "uuid"
import { addTodoAC, changeFilterAc, changeTodoTitleAC, FilterType, removeTodoAC, StateTodoType, toDoListReduser } from "../store/toDoListReduser"


test('delete todo list', () => {

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

const action=removeTodoAC(toDoListId4)
  const endState = toDoListReduser(startState, action)

  expect(endState.length).toBe(2)
  expect(endState[0].id).toBe(toDoListId3)

})

test('add todolist', () => {

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

  let newItem:StateTodoType = {
    title: 'ew',
    id: toDoListId1,
    filter: 'All',
    addedDate: 'string',
    order: 0,
  }

  const action=addTodoAC(newItem)

  const endState: Array<StateTodoType> = toDoListReduser(startState, action)

  expect(endState.length).toBe(5)
  expect(endState[4]).not.toBe(undefined)
  expect(endState[4].title).toBe('test drive')
})




test('change title ',()=>{

  let newToDoListTitle='new title'

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

  const action = changeTodoTitleAC(newToDoListTitle,toDoListId1 )

const endState:Array<StateTodoType>=toDoListReduser(startState,action)

expect(endState[0].title).toBe(newToDoListTitle)
})



test('change filter ', () => {

  let toDoListId1 = v1()
  let toDoListId2 = v1()
  let toDoListId3 = v1()
  let toDoListId4 = v1()

  let newToDoListFilter:FilterType = 'Completed'

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
  const action = changeFilterAc(toDoListId1,newToDoListFilter )

  const endState: any = toDoListReduser(startState, action)

  expect(endState[0].filter).toBe('Completed')
})

// double click? 