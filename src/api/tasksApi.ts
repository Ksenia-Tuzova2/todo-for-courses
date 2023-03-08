import { instance } from "./instance"
import {  } from "./todoApi"


export const taskApi = {
    
    postTaskRequest(title:string, todolistId:any) {
        return (instance.post(`/todo-lists/${todolistId}/tasks`,{title:title}
            //это позволяет нам делать кроссдоменный запрос
            // и собирать куку - текстовый файл с данными  -
            //креденшлс значит - с разрешением, с правами, с регалиями, 
            //мы разрешаем отослать свой запрос и получить его
        ).then((Response) => { return (Response.data) }))
    },
    
    getTaskRequest(todoListId:string) {
    
        return instance.get(`/todo-lists/${todoListId}/tasks`,
         
        )
    },


    putTaskRequest(todolistId:any,taskId:any, title:string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`,
       {
          title:title,
          description:' ',
          completed: false,
          status: 0,
          priority: 0,
          startDate: '02.03.2022',
          deadline:'02.03.2022'
        }, 
          

        ).then((Response) => { return (Response.data) })
    },
    deleteTaskRequest(todolistId:any,taskId:any) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`,
        //   {
        //    headers:{ "API-KEY":'c999ab7d-e835-4c75-be15-733c12'
        //   }}

        ).then((Response) => { return (Response.data) })
    },

    reorderTaskRequest(todolistId:any,taskId:any) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`,
        //   {
        //    headers:{ "API-KEY":'c999ab7d-e835-4c75-be15-733c12'
        //   }}

        ).then((Response) => { return (Response.data) })
    },

}