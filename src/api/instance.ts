import axios from "axios";

//instance создает объект с базовыми параметрами для запроса - бейс урл и виз креденшлс 
export const instance=axios.create({
    withCredentials: true,
    headers:{
'API-KEY':'c999ab7d-e835-4c75-be15-733c1248cfc4'
    },
    baseURL:'https://social-network.samuraijs.com/api/1.1',
}) 