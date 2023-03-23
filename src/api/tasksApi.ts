import { PriorityTaskType, StatusTaskType, TasksType } from "../store/tasksReduser"
import { instance, instancePut } from "./instance"
import { } from "./todoApi"

//пофиксить типы - смотреть что приходит через дебаггер
//новая таска:задизейблить кнопки пока делается запрос 
//перетащить загрузку из кселикса сюда
//сделать правильный апдейт запрос - понять , почему с сервера приходит ошибка

type ResponceCreateTaskType = {
    data: TasksType,
    resultCode: number,
    messages: Array<string> | string,
}

type ResponceGetTaskType = {
    items: Array<TasksType>,
    Items: TasksType,
    error: string,
}

type ResponcePutTaskType = {
    data: TasksType,
    resultCode: number,
    messages: Array<string> | string,
}

type ResponceDeleteTaskType = {
    config:any,
    data: {
        data: any,
        messages:Array<string>,
        resultCode:number,
        fieldsErrors: Array<string>, 
    }
    headers:any,
    request:any,
    status: number,
    statusText: string,

}

type ResponceReorderTaskType = {
    data: TasksType,
    resultCode: number,
    messages: Array<string> | string,
}

export const taskApi = {

    сreateTaskRequest(title: string, todolistId: any) {
        return (instance.post<ResponceCreateTaskType>(`/todo-lists/${todolistId}/tasks`, { title: title }
        ).then((Response) => {
            return (Response.data)
        }))
    },

    getTaskRequest(todoListId: string) {
        return instance.get<ResponceGetTaskType>(`/todo-lists/${todoListId}/tasks`
        )
    },

    updateTaskRequest(
        todolistId: string,
        taskId: string,
        title: string,
    
    ) {
        const test = {
            title: title,
            description: 'there is no description yet',
            completed:false,
            status: 1,
            priorit: 0,
            startDate: "2023-03-18T09:26:04.253",
            deadline: "2023-04-18T09:26:04.253",
        }
        return instancePut.put<ResponcePutTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`,
            {
                ...test
            },
        ).then((Response) => {
          
            return (Response.data) })
    },

    deleteTaskRequest(todolistId: any, taskId: any) {
        //как это пр
        return instance.delete<ResponceDeleteTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`,
        ).then((Response) => { 
            debugger
            return (Response.data) 
        })
    },

    reorderTaskRequest(todolistId: any, taskId: any) {
        return instance.put<ResponceReorderTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`,
        ).then((Response) => { return (Response.data) })
    },

}