import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { AddItemForm } from '../AddItemForm';
import { FilterType } from '../../App';
import { Button, Checkbox } from '@mui/material';
import { TaskItem } from '../taskItem/taskItem';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../store/redux-store';
import { addTaskAC, changeChecBoxAC, removeTaskAC } from '../../store/tasksReduser';
import { changeFilterAc } from '../../store/toDoListReduser';


export type TasksType = {
    task: string,
    id: string,
    description: string,
    checked: boolean,
}

export type ToDoListType = {
    tasks: Array<any>,
    title: string,
    filter: string
    todoId: string
    deleteToDoList: (id: string) => void
}


export function ToDoList({
    tasks,
    title,
    filter,
    todoId,
    deleteToDoList }: ToDoListType) {

        let dispatch=useDispatch()


    
    

    //вынесли хэндлер за пределы мапа, чтобы не ограничиваться скоупом. Для этого мы в хэндлере передаем в параметре айдишку в пределах мапа, а потом мы передаем в делит таск нужную айдишку таким образом , хоть и за пределами мапа
    const onDeleteTaskHandler = (idItem: string) => {
        dispatch(removeTaskAC(todoId, idItem))
    }
    //даже те функции которые в обработчиках в методе мап нужно облегчать - пишем прямо в мап функцию, которая будет считываться при нажатии на кнопку
    //задание- зарефакторить кселикс по этому методу

  

    const changeFilter = ( param: FilterType) => {
        dispatch( changeFilterAc(todoId, param))
     }



    let mapFunction = tasks.map((el: TasksType) => {

       

        const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
           dispatch (changeChecBoxAC( e.currentTarget.checked, todoId, el.id,))
        }


        return <div key={el.id}>
            <TaskItem
                checked={el.checked}
                task={el.task}
                onChangeHandler={changeCheckBoxHandler}
                onDeleteHandler={onDeleteTaskHandler}
                 id={el.id} />
        </div>
    })



const addTask=(taskTitle:string)=>{
    //не понимаю как выудить тайтл таски для ац
    dispatch(addTaskAC(taskTitle,todoId))
}


    return (
        <div className="App">
            <div>
                <h3>{title}</h3>

                <AddItemForm addItem={addTask} />

                <ul>
                    {mapFunction}

                </ul>
                <div>
                   

                    <Button color={'secondary'} variant={filter === 'All' ? 'outlined' : 'text'} onClick={() => changeFilter('All')}>All</Button>
                    <Button variant={filter === 'Active' ? 'outlined' : 'text'} onClick={() => changeFilter('Active')}>Active</Button>
                    <Button variant={filter === 'Completed' ? 'outlined' : 'text'} onClick={() => changeFilter('Completed')}>Completed</Button>

                </div>
            </div>
        </div>
    );
}


