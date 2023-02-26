import { v1 } from "uuid";
import { ToDoListsType } from "../App";
import { deleteListActionCreator, tasksReducer } from "../store/tasksReduser";
import { TasksListsType } from "../store/tasksReduser.test"
import { addTodoActionCreator, removeActionCreator, toDoListReduser } from "../store/toDoListReduser";

test('ids should be equeal', () => {

  // const startTaskState: TasksListsType = {};
  // const startToDoState: Array< ToDoListsType> = [];

  // const action = addTodoActionCreator('h')

  // const endTasksState = tasksReducer(startTaskState, action)
  // const endTodoListState = toDoListReduser(startToDoState, action)

  // const keys = Object.keys(endTasksState)
  // const idFromTasks = keys[0]
  // const idFromTodo = endTodoListState[0].id

  // expect(idFromTasks).toBe(action.id)
  // expect(idFromTodo).toBe(action.id)


})

test('property with todolist id should be deleted', () => {
  let toDoListId1 = v1()
  let toDoListId2 = v1()

  const startTaskState: TasksListsType = {
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
  };

  const action = deleteListActionCreator(toDoListId2)

  const endState = tasksReducer(startTaskState, action)


  const keys = Object.keys(endState)


  expect(keys.length).toBe(1)
  expect(endState[toDoListId2]).toBeUndefined()


})