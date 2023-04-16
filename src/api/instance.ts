import axios from "axios"


export type ResponceUniversalTodoType< D={} >={
    resultCode: number
    messages: [string],
    data: D
}

//это позволяет нам делать кроссдоменный запрос
// и собирать куку - текстовый файл с данными  -
//креденшлс значит - с разрешением, с правами, с регалиями, 
//мы разрешаем отослать свой запрос и получить его

//instance создает объект с базовыми параметрами для запроса 

export const instance = axios.create({
   withCredentials: true,
    headers: {
        'API-KEY': '0645beeb-a75d-4053-b054-3d17771d2002'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
}) 

export const instancePut = axios.create({
    withCredentials: true,
     headers: {
         'API-KEY': 'c999ab7d-e835-4c75-be15-733c1248cfc4'
     },
     baseURL: 'https://social-network.samuraijs.com/api/1.1',
 }) 