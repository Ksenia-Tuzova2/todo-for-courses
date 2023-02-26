import { v1 } from "uuid"
import { ToDoListsType } from "../App"
import { addTodoAC, changeFilterAc, toDoListReduser } from "../store/toDoListReduser"

test('delete todo list', () => {

  let toDoListId1 = v1()
  let toDoListId2 = v1()
  let toDoListId3 = v1()

  let startState: Array<ToDoListsType> = [
    {
      title: 'what to learn',
      id: toDoListId1,
      filter: 'All'
    },
    {
      title: 'what to buy',
      id: toDoListId2,
      filter: 'All'
    },
    {
      title: 'what i want',
      id: toDoListId3,
      filter: 'All'
    },
  ]



  const endState = toDoListReduser(startState, {
    type: 'REMOVE-TODO-LIST',
    id: toDoListId1
  })

  expect(endState.length).toBe(2)
  expect(endState[0].id).toBe(toDoListId2)

})

test('add todolist', () => {

  let toDoListId1 = v1()
  let toDoListId2 = v1()
  let toDoListId3 = v1()

  let newToDoListTitle = 'my friends'

  let startState: Array<ToDoListsType> = [
    {
      title: 'what to learn',
      id: toDoListId1,
      filter: 'All'
    },
    {
      title: 'what to buy',
      id: toDoListId2,
      filter: 'All'
    },
    {
      title: 'what i want',
      id: toDoListId3,
      filter: 'All'
    },
  ]



  const endState: any = toDoListReduser(startState, addTodoAC(newToDoListTitle))

  expect(endState.length).toBe(4)
  expect(endState[3]).not.toBe(undefined)

  expect(endState[3].title).toBe('my friends')
})

// test('change title ',()=>{

//   let toDoListId1 = v1()
//   let toDoListId2 = v1()
//   let toDoListId3 = v1()

//   let newToDoListTitle='new title'

//   let startState:Array<ToDoListsType>=[
//     {
//         title: 'what to learn',
//         id: toDoListId1,
//         filter: 'All'
//     },
//     {
//         title: 'what to buy',
//         id: toDoListId2,
//         filter: 'All'
//     },
//     {
//         title: 'what i want',
//         id: toDoListId3,
//         filter: 'All'
//     },
// ]



// const endState:any=toDoListReduser(startState,{type:'CHANGE-TITLE',
// id:toDoListId1,
// newTitle: newToDoListTitle,
// })

// expect(endState[0].title).toBe(newToDoListTitle)
// })

test('change filter ', () => {



  let toDoListId1 = v1()
  let toDoListId2 = v1()
  let toDoListId3 = v1()

  let newToDoListFilter = 'All'

  let startState: Array<ToDoListsType> = [
    {
      title: 'what to learn',
      id: toDoListId1,
      filter: 'All'
    },
    {
      title: 'what to buy',
      id: toDoListId2,
      filter: 'All'
    },
    {
      title: 'what i want',
      id: toDoListId3,
      filter: 'All'
    },
  ]


  const action = changeFilterAc(toDoListId1,newToDoListFilter )

  const endState: any = toDoListReduser(startState, action)

  expect(endState[0].filter).toBe('All')
})


//test dreive developmeny
//double click? 