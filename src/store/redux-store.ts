import { legacy_createStore as createStore} from 'redux'
import { Store } from 'redux'
import { toDoListReduser } from './toDoListReduser'
import { combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from './tasksReduser'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const reducersPack=combineReducers({
    tasksReducer:tasksReducer,
    toDoListReduser: toDoListReduser,
})

export type Rootstate=ReturnType<typeof reducersPack>

export let store=createStore(reducersPack, applyMiddleware(thunk))
// const StoreI = typeof store

export const dispatch=store.dispatch

export type AppDispatch = typeof store.dispatch;

//диспатч для санок- юзаем в хэндлерах, где надо использовать санки
export const UseAppDispatch=()=>useDispatch<any>();


export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector

//@ts-ignore
window.store = store