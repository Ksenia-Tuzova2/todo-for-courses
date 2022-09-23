import React, { useState, ChangeEvent, KeyboardEvent} from 'react';
import { FilterType } from './App';


export type TasksType = {
    task: string,
    id: string,
    description: string,
    checked: boolean,
}

export type ToDoListType = {
    title: string,
    tasks: Array<TasksType>,
    deleteTask: (toDoListId: string, id: string) => void,
    changeFilter: ( toDoListId:string, value: FilterType) => void
    addTask: (toDoListId: string, newText: string) => void //????
    changeCheckBox:(toDoListId: string, id:string, checked:boolean )=>void//???
    filter:string
    id:string
}


export function ToDoList({ title, tasks, deleteTask, changeFilter, addTask, changeCheckBox, filter, id }: ToDoListType) {


   
//даже те функции которые в обработчиках в методе мап нужно облегчать - пишем прямо в мап функцию, которая будет считываться при нажатии на кнопку
//задание- зарефакторить кселикс по этому методу
    let mapFunction = tasks.map((el: any) => {
        const onDeleteHandler=()=>{
            deleteTask(id, el.id)
        }
        const onChangeHandler=(e: ChangeEvent<HTMLInputElement>)=>{ 
            changeCheckBox(id, el.id, e.currentTarget.checked);
        }
        

        return <li className={el.checked?'checked':''} key={el.id}>
            <input type="checkbox" checked={el.checked} onChange={onChangeHandler}
/>
            <span>{el.task}</span>
            <button onClick={onDeleteHandler}>x</button>
            </li>
    })

    let [value, setValue] = useState('')

    let [err,setErr]=useState('')

    //мы не должны писать функции в обработчиках событий, поэтому мы должны их выносить 

    const onChabgeHandlerElement = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.currentTarget.value) }

    const plusButton = () => {
        
        if(value.trim()!==''){
            addTask(id, value.trim()); 
            setValue('');
        } else setErr('err')
    
       
    }

    const onAllClickHandler=()=>{
        changeFilter(id,'All')
    }

    const onActiveClickHandler=()=>{
        changeFilter( id, 'Active')
    }

    const onCompletedClickHandler=()=>{
        changeFilter(id, 'Completed')
    }
  
   
        

   
    const onKeyDownHandler= (e: KeyboardEvent<HTMLInputElement>) =>{
        setErr('')
        if (e.key === 'Enter') {
            plusButton()
        }
    }
    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                <div>
                    <input value={value} onChange={onChabgeHandlerElement
                    } onKeyPress={onKeyDownHandler} className={err&&'erorr'}/>
                    <button onClick={plusButton}>+</button>
                </div>
                {err&& <div className="err">erorr</div>}
                <ul>
                    {mapFunction}

                </ul>
                <div>
                    <button onClick={onAllClickHandler } className={filter==='All'?'active_btn':''}>All</button>
                    <button className={filter==='Active'?'active_btn':''} onClick={onActiveClickHandler}>Active</button>
                    <button className={filter==='Completed'?'active_btn':''} onClick={onCompletedClickHandler }>Completed</button>
                </div>
            </div>
        </div>
    );
}


