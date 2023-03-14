import { TasksType } from "../store/tasksReduser"
import { instance } from "./instance"
import { } from "./todoApi"

type ResponcePostTaskType = {
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

    postTaskRequest(title: string, todolistId: any) {
        return (instance.post<ResponcePostTaskType>(`/todo-lists/${todolistId}/tasks`, { title: title }
        ).then((Response) => { return (Response.data) }))
    },

    getTaskRequest(todoListId: string) {
        return instance.get<ResponceGetTaskType>(`/todo-lists/${todoListId}/tasks`
        )
    },

    updateTaskRequest(todolistId: any, taskId: any, title: string) {
        return instance.put<ResponcePutTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`,

            {
                title: title,
                description: ' ',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '02.03.2022',
                deadline: '02.03.2022'
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