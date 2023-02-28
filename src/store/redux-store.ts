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

export let store:Store<Rootstate>=createStore(reducersPack, applyMiddleware(thunk))

export const dispatch=store.dispatch

export type AppDispatch = typeof store.dispatch;

//делаем юзаппдиспатч, чтобы была возможность прокидывать 
//через диспатч санку, которая затем уже делает запрос 
//если в местах с контейнерными компонентами используем мапдиспатч ту пропс
//который автоматом оборачивает функцию диспатчем, то в определенных местах 
//нам нужно такой апп диспатч
export const UseAppDispatch=()=>useDispatch<any>();


export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector

//@ts-ignore
window.store = store