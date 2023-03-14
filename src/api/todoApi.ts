import { ToDoListType } from "../components/toDoList/ToDoList"
import { StateTodoType } from "../store/toDoListReduser"
import { instance } from "./instance"

type TodoType= {
    id: string,
    title: string,
    addedDate: string,
    order: number
 } 


type ResponcePostTodoType={
    resultCode: number,
    messages: string[],
    data: {
      item: TodoType
    }
}


type ResponceGetTodoType=TodoType[]

type ResponcePutTodoType={
    title:string
}

type ResponceDeleteTodoType={
    resultCode: number
    messages: [string],
    data: {}
}



export const todoApi = {
    getTodoRequest() {
        //  пишем в дженерике что возвращает запрос 
        return instance.get<ResponceGetTodoType>(`/todo-lists`,
        ).then((Response) => { return (Response.data) })
    },

    postTodoRequest(title: string) {
        return (instance.post<ResponcePostTodoType>(`/todo-lists`,
            {
             title: title
            }, 
        )
        ).then((Response) => { return (Response.data) })
    },

    updateTodoRequest(todolistId: string, title: string) {
        return (instance.put<ResponcePutTodoType>(`/todo-lists/${todolistId}`,
            { title: title }, )
        ).then((Response) => { return (Response.data) })
    },

    deleteTodoRequest(todolistId: string) {
        return (instance.delete<ResponceDeleteTodoType>(`/todo-lists/${todolistId}`,
         )
        ).then((Response) => { return (Response.data) })
    },

}