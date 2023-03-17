import { v1 } from "uuid"
import { addTaskAC, changeTaskTitleAC, removeTaskAC, StateTasksType, tasksReducer } from "../store/tasksReduser"



test('correct task should be deleted from correct array', () => {


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

    const action = removeTaskAC(toDoListId2, taskId)
    const endState = tasksReducer(startState, action)

    expect(endState[toDoListId2].length).toBe(1)
    expect(endState[toDoListId2].find((t:any)=>t.title==='string')).toBeFalsy()

})


test('new task should be added for correct array', () => {


    let toDoListId1 = v1()
    let toDoListId2 = v1()

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
           
        ],
        [toDoListId2]: [
          
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
    }

    let newTask= {
        id: v1(),
        description: '',
        title: 'jucie',
        completed: false,
        status: 1,
        priority: 0,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 1,
        addedDate: 'string',
    }
    const action = addTaskAC(newTask, toDoListId1)
    const endState = tasksReducer(startState, action)

    expect(endState[toDoListId1].length).toBe(2)
    expect(endState[toDoListId2].length).toBe(2)
    expect(endState[toDoListId1][0].completed).toBe(false)
    expect(endState[toDoListId1][0].title).toBe('jucie')
})


test('task title should be changed for correct array', () => {


    let toDoListId1 = v1()
    let toDoListId2 = v1()


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
           
        ],
        [toDoListId2]: [
          
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
    }

    const action = changeTaskTitleAC('MilkiWay', toDoListId1, startState[toDoListId1][0].id)
    const endState = tasksReducer(startState, action)

    expect(endState[toDoListId1][0].title).toBe('MilkiWay')

})


