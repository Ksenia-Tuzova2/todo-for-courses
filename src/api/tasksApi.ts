import { instance } from "./instance"
import { } from "./todoApi"


 type ResponcePostTaskType={
}

type ResponceGetTaskType={
}

type ResponcePutTaskType={
}

type ResponceDeleteTaskType={
}

type ResponceReorderTaskType={
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

    putTaskRequest(todolistId: any, taskId: any, title: string) {
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