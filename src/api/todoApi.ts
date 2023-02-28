import { instance } from "./instance"


export const todoApi = {
    getTodoRequest() {
        return instance.get(`/todo-lists`,
            {
                headers: {
                    "API-KEY": 'c999ab7d-e835-4c75-be15-733c12'
                }
            }
        ).then((Response) => { return (Response.data) })
    },
    postTodoRequest(title: string) {
        return (instance.post(`/todo-lists`,
            { title: title })
        ).then((Response) => { return (Response.data) })
    },
    putTodoRequest(todolistId: string, title: string) {
        return (instance.put(`/todo-lists/${todolistId}`,
            { title: title })
        ).then((Response) => { return (Response.data) })
    },
    deleteTodoRequest(todolistId: string) {
        return (instance.delete(`/todo-lists/${todolistId}`)
        ).then((Response) => { return (Response.data) })
    },

}