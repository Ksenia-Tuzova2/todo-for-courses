import axios from "axios";

//instance создает объект с базовыми параметрами для запроса - бейс урл и виз креденшлс 
export const instance=axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0',
}) 