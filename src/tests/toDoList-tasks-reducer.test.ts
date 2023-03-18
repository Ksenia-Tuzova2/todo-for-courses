import { v1 } from "uuid";
import { deleteListAC, setTasks, StateTasksType, tasksReducer, TasksType } from "../store/tasksReduser";
import { addTodoAC, StateTodoType, toDoListReduser } from "../store/toDoListReduser";


let toDoListId1 = v1()
let toDoListId2 = v1()
let toDoListId3 = v1()
let toDoListId4 = v1()

let startTaskState: StateTasksType = {
    [toDoListId1]: [

        {
            id: toDoListId1,
            description: '',
            title: 'string',
            completed: false,
            status: 1,
            priority: 0,
            startDate: 'string',
            deadline: 'string',
            todoListId: 'string',
            order: 1,
            addedDate: 'string',
        },
        {
            id: toDoListId2,
            description: '',
            title: 'ew',
            completed: false,
            status: 1,
            priority: 0,
            startDate: 'string',
            deadline: 'string',
            todoListId: 'string',
            order: 1,
            addedDate: 'string',
        },
    ],
    [toDoListId2]: [

        {
            id: toDoListId3,
            description: '',
            title: 'string',
            completed: false,
            status: 1,
            priority: 0,
            startDate: 'string',
            deadline: 'string',
            todoListId: 'string',
            order: 1,
            addedDate: 'string',
        },
        {
            id: toDoListId4,
            description: '',
            title: 'ew',
            completed: false,
            status: 1,
            priority: 0,
            startDate: 'string',
            deadline: 'string',
            todoListId: 'string',
            order: 1,
            addedDate: 'string',
        },
    ]

}

let startTodoState: Array<StateTodoType> = [
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
    let toDoListId1 = v1()
    let toDoListId2 = v1()

    let taskId = v1()

    let startState: StateTasksType = {
        [toDoListId1]: [

            {
                id: v1(),
                description: '',
                title: 'string',
                completed: false,
                status: 1,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 1,
                addedDate: 'string',
            },
            {
                id: v1(),
                description: '',
                title: 'ew',
                completed: false,
                status: 1,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 1,
                addedDate: 'string',
            },
        ],
        [toDoListId2]: [

            {
                id: taskId,
                description: '',
                title: 'string',
                completed: false,
                status: 1,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 1,
                addedDate: 'string',
            },
            {
                id: v1(),
                description: '',
                title: 'ew',
                completed: false,
                status: 1,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 1,
                addedDate: 'string',
            },
        ]

    }

    let startTodoState: Array<StateTodoType> = [
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

test('ids should be equeal', () => {

    //когда новый туду лист добавляется  в стейт туду листов,
    //мы добавляем новый пустой туду в стейт тасок, 
    //чтобы получился новый ключ 
    //для этого сравниваем затем айдишки ключа в таскстейт и в массиве туду стейт

    const newItem: StateTodoType = {
        title: 'ew',
        id: toDoListId1,
        filter: 'All',
        addedDate: 'string',
        order: 0,
    }


    const action = addTodoAC(newItem)


    const endTasksState = tasksReducer(startTaskState, action)
    const endTodoListState = toDoListReduser(startTodoState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodo = endTodoListState[0].id

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodo).toBe(action.id)


})

test('property with todolist id should be deleted', () => {

    const action = deleteListAC(toDoListId2)

    const endTaskState = tasksReducer(startTaskState, action)

    const keys = Object.keys(endTaskState)


    expect(keys.length).toBe(1)
    expect(endTaskState[toDoListId2]).toBeUndefined()
})

test('want to set tasks way giving todoid', () => {


  const item= [
      
    {
        id: v1(),
        description: '',
        title: 'string',
        completed: false,
        status: 1,
        priority: 0,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 1,
        addedDate: 'string',
    },
    {
        id: v1(),
        description: '',
        title: 'ew',
        completed: false,
        status: 1,
        priority: 0,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 1,
        addedDate: 'string',
    },
]

  const action = setTasks(item, toDoListId2)

  const endTaskState = tasksReducer(startTaskState, action)
  expect(endTaskState[toDoListId2].length).toBe(2)

})