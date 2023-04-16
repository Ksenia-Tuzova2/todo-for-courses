import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

import { tasksReducer } from './tasksReduser'
import { toDoListReduser } from './toDoListReduser'


//собираем редьюсеры в один пак
const reducersPack=combineReducers({
    tasksReducer:tasksReducer,
    toDoListReduser: toDoListReduser,
})

//типизируем редьюсер
export type Rootstate=ReturnType<typeof reducersPack>

//собираем стор с прослойкой для санок 
export let store=createStore(reducersPack, applyMiddleware(thunk))

//диспатч для обычных экшен крейторов
export const dispatch=store.dispatch

//типизируем диспатч
export type AppDispatch = typeof store.dispatch;

//диспатч для санок- юзаем в хэндлерах, где надо использовать санки
export const UseAppDispatch=()=>useDispatch<any>();

//юзселектор
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector

//@ts-ignore
window.store = store