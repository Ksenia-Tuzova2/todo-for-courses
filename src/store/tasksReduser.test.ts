import { v1 } from "uuid"
import { ToDoListsType } from "../App"
import { addTaskActionCreator, changeFilterActionCreator, changeTaskTitleActionCreator, removeTaskActionCreator, tasksReducer } from "./tasksReduser"

export type FilterType = 'All' | 'Active' | 'Completed'

export type TasksListsType = {
  [key: string]: Array<TasksType>,

}

type TasksType={
  task: string,
  id:string,
  description: string,
  checked: boolean,
}


test('correct task should be deleted from correct array',()=>{
 
  
  let toDoListId1 = v1()
  let toDoListId2 = v1()
  let toDoListId3 = v1()

  let taskId = v1()

  let startState: TasksListsType = {
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
        task: 'books',
        id: taskId ,
        description: 'something',
        checked: true,
      },
      {
        task: 'magazines',
        id: v1(),
        description: 'something',
        checked: true,
      },
    ],
    [toDoListId3]: [
      {
        task: 'food',
        id: v1(),
        description: 'something',
        checked: true,
      },
      {
        task: 'bakery',
        id: v1(),
        description: 'something',
        checked: true,
      },
    ],
  }

  const action= removeTaskActionCreator( toDoListId2,taskId )
const endState=tasksReducer(startState,action)

expect(endState[toDoListId2].length).toBe(1)
// expect(endState.every((t:any)=>t.id!==toDoListId2)).toBeTruthy()

})



test('new task should be added for correct array',()=>{
 
  
  let toDoListId1 = v1()
  let toDoListId2 = v1()


  let startState: TasksListsType = {
    [toDoListId1]: [
      {
        task: 'js',
        id: v1(),
        description: 'something',
        checked: true,
      },
    ],
    [toDoListId2]: [
      {
        task: 'books',
        id: v1() ,
        description: 'something',
        checked: true,
      },
      {
        task: 'magazines',
        id: v1(),
        description: 'something',
        checked: true,
      },
    ],
  }

  const action= addTaskActionCreator('jucie',toDoListId1 )
const endState=tasksReducer(startState,action)

expect(endState[toDoListId1].length).toBe(2)
expect(endState[toDoListId2].length).toBe(2)
expect(endState[toDoListId1][0].checked).toBe(false)
expect(endState[toDoListId1][0].task).toBe('jucie')
})



test('task filter should be changed for correct array',()=>{
 
  
  let toDoListId1 = v1()
  let toDoListId2 = v1()


  let startState: TasksListsType = {
    [toDoListId1]: [
      {
        task: 'js',
        id: v1(),
        description: 'something',
        checked: false,
      },
    ],
    [toDoListId2]: [
      {
        task: 'books',
        id: v1() ,
        description: 'something',
        checked: true,
      },
      {
        task: 'magazines',
        id: v1(),
        description: 'something',
        checked: true,
      },
    ],
  }

  const action= changeFilterActionCreator( startState[toDoListId1][0].checked,toDoListId1 , startState[toDoListId1][0].id )
const endState=tasksReducer(startState,action)

expect(endState[toDoListId1][0].checked).toBeTruthy()

})

test('task title should be changed for correct array',()=>{
 
  
  let toDoListId1 = v1()
  let toDoListId2 = v1()


  let startState: TasksListsType = {
    [toDoListId1]: [
      {
        task: 'js',
        id: v1(),
        description: 'something',
        checked: false,
      },
    ],
    [toDoListId2]: [
      {
        task: 'books',
        id: v1() ,
        description: 'something',
        checked: true,
      },
      {
        task: 'magazines',
        id: v1(),
        description: 'something',
        checked: true,
      },
    ],
  }

  const action= changeTaskTitleActionCreator( 'MilkiWay',toDoListId1 , startState[toDoListId1][0].id )
const endState=tasksReducer(startState,action)

expect(endState[toDoListId1][0].task).toBe( 'MilkiWay')

})

test('add new todo list',()=>{
 
  
  let toDoListId1 = v1()
  let toDoListId2 = v1()


  let startState: TasksListsType = {
    [toDoListId1]: [
      {
        task: 'js',
        id: v1(),
        description: 'something',
        checked: false,
      },
    ],
    [toDoListId2]: [
      {
        task: 'books',
        id: v1() ,
        description: 'something',
        checked: true,
      },
      {
        task: 'magazines',
        id: v1(),
        description: 'something',
        checked: true,
      },
    ],
  }


//   const action=  
// const endState=tasksReducer(startState,action)


// const keys=Object.keys(endState)
// const newKey=keys.find(k=>k!=toDoListId1&&toDoListId2)
// if(!newKey) throw Error('new key should be adedd')

// expect(keys.length).toBe(3)
// expect(endState[newKey]).toBeTruthy()
})

