import React, { useState, ChangeEvent, KeyboardEvent} from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterType } from './App';
import { Button } from './components/button';


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
    addTask: (toDoListId: string, newText: string) => void 
    changeCheckBox:(toDoListId: string, id:string, checked:boolean )=>void//???
    filter:string
    id:string
    deleteToDoList:(id:string)=>void
}


export function ToDoList({ title, tasks, deleteTask, changeFilter, addTask, changeCheckBox, filter, id ,deleteToDoList}: ToDoListType) {

//вынесли хэндлер за пределы мапа, чтобы не ограничиваться скоупом. Для этого мы в хэндлере передаем в параметре айдишку в пределах мапа, а потом мы передаем в делит таск нужную айдишку таким образом , хоть и за пределами мапа
    const onDeleteHandler=(idItem:string)=>{
        deleteTask(id, idItem)
    }
//даже те функции которые в обработчиках в методе мап нужно облегчать - пишем прямо в мап функцию, которая будет считываться при нажатии на кнопку
//задание- зарефакторить кселикс по этому методу
    let mapFunction = tasks.map((el: any) => {
      
        const onChangeHandler=(e: ChangeEvent<HTMLInputElement>)=>{ 
            changeCheckBox(id, el.id, e.currentTarget.checked);
        }
        

        return <li className={el.checked?'checked':''} key={el.id}>
            <input type="checkbox" checked={el.checked} onChange={onChangeHandler}
/>
            <span>{el.task}</span>
            <button onClick={()=>onDeleteHandler(el.id)}>x</button>
            </li>
    })

    let [value, setValue] = useState('')

    let [err,setErr]=useState('')

    //мы не должны писать функции в обработчиках событий, поэтому мы должны их выносить 

    const plusButton = () => {
        
        if(value.trim()!==''){
            addTask(id, value.trim()); 
            setValue('');
        } else setErr('err')
    
       
    }
    
    const onClickHandler=(param:FilterType)=>{
        changeFilter(id, param)
    }


   function addTodoList(){

   }
//ПОЧЕМУ_ТО НЕ МОГУ ТИПИЗИРОВАТЬ ЭВЕНТ
   function someFunction(event:any){
alert(event.currentTarget.name)
   }
    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                
                <AddItemForm addItem={addTask} id={id} deleteToDoList={deleteToDoList} addToDoList={addTodoList} />
               
                <ul>
                    {mapFunction}

                </ul>
                <div>
                    <button name='delete' onClick={someFunction}>X</button>
                    <button name='save' onClick={someFunction}>X</button>
                    <Button className={filter==='All'?'active_btn':''} name='All' callBack={()=>onClickHandler('All') }/>

                    <Button className={filter==='Active'?'active_btn':''} name='Active' callBack={()=>onClickHandler('Active') }/>

                    <Button className={filter==='Completed'?'active_btn':''} name='Completed' callBack={()=>onClickHandler('Completed') }/>
                </div>
            </div>
        </div>
    );
}


