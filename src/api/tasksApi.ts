import { TasksType } from "../store/tasksReduser"
import { instance } from "./instance"
import { } from "./todoApi"

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
    data: TasksType,
    resultCode: number,
    messages: Array<string> | string,
}

type ResponceReorderTaskType = {
    data: TasksType,
    resultCode: number,
    messages: Array<string> | string,
}

export const taskApi = {

    сreateTaskRequest(title: string, todolistId: any) {
        return (instance.post<ResponceCreateTaskType>(`/todo-lists/${todolistId}/tasks`, { title: title }
        ).then((Response) => { return (Response.data) }))
    },

    getTaskRequest(todoListId: string) {
        return instance.get<ResponceGetTaskType>(`/todo-lists/${todoListId}/tasks`
        )
    },

    updateTaskRequest(
        todolistId: string,
         taskId: string, 
         title: string,
         description: string = 'there is no description yet', 
         completed:boolean=false,
         status:number=0,
         priority:number=0,
         startDate: string = '02.03.2022',
        deadline: string = '02.03.2022',
         ) {
        return instance.put<ResponcePutTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`,

            {
                title,
                description,
                completed,
                status,
                priority,
                startDate,
                deadline,
            },

        ).then((Response) => { return (Response.data) })
    },

    deleteTaskRequest(todolistId: any, taskId: any) {
        return instance.delete<ResponceDeleteTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`,
        ).then((Response) => { return (Response.data) })
    },

    reorderTaskRequest(todolistId: any, taskId: any) {
        return instance.put<ResponceReorderTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`,
        ).then((Response) => { return (Response.data) })
    },

}