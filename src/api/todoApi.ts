import axios from "axios"
import { instance, ResponceUniversalTodoType } from "./instance"

type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponceCreateTodoType = {
    item: TodoType
}

type ResponceGetTodoType = TodoType[]

type ResponcePutTodoType = {
    title: string
}



export const todoApi = {
    getTodoRequest() {
        //  пишем в дженерике что возвращает запрос 
        return instance.get<ResponceUniversalTodoType<ResponceGetTodoType>>(`/todo-lists`,
        ).then((Response) => { return (Response.data) })
    },

    createTodoRequest(title: string) {
        return (instance.post<ResponceUniversalTodoType<ResponceCreateTodoType>>(`/todo-lists`,
            {
                title: title
            },
        )
        ).then((Response) => { return (Response.data) })
    },

    updateTodoRequest(todolistId: string, title: string) {
        return (instance.put<ResponceUniversalTodoType<ResponcePutTodoType>>(`/todo-lists/${todolistId}`,
            { title: title },)
        ).then((Response) => { return (Response.data) })
    },

    deleteTodoRequest(todolistId: string) {
        return instance.delete(`/todo-lists/${todolistId}`)
        .then((Response) => { 
            return (Response.data) 
        })
    },

}