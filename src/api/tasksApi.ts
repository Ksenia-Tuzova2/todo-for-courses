import { instance } from "./instance"


export const taskApi = {
    
    postTaskRequest(title:string, todolistId:any) {
        return (instance.post(`{/todo-lists/${todolistId}/tasks`,
          {title:title}
            //это позволяет нам делать кроссдоменный запрос
            // и собирать куку - текстовый файл с данными  -
            //креденшлс значит - с разрешением, с правами, с регалиями, 
            //мы разрешаем отослать свой запрос и получить его
        ).then((Response) => { return (Response.data) }))
    },
    
    getTaskRequest(page:number, count:number) {
        return instance.get(`/auth/me?page:${page};count:${count}`,
          {
           headers:{ "API-KEY":'c999ab7d-e835-4c75-be15-733c12'
          }}
        ).then((Response) => { return (Response.data) })
    },
    putTaskRequest(todolistId:any,taskId:any, title:string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`,
          {
           headers:{ "API-KEY":'c999ab7d-e835-4c75-be15-733c12'
          },
          title:title,
          description:' ',
          completed: false,
          status: 0,
          priority: 0,
          startDate: '02.03.2022',
          deadline:'02.03.2022'}

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