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
        // return fetch('https://social-network.samuraijs.com/api/1.1/todo-lists/' + todolistId, {
        //     method: "DELETE",
        //         mode:'cors',
        //     credentials: 'same-origin',
        //     headers:{
        //         'API-KEY':'0645beeb-a75d-4053-b054-3d17771d2002'
        //     }
        // }).then(res => res.json())

        return instance.delete(`/todo-lists/${todolistId}`)
        .then((Response) => { 
            return (Response.data) 
        })

    //     return (instance.delete<any>(`/auth/login`)
    // ).then((Response) => { return (Response.data) })
    },

}