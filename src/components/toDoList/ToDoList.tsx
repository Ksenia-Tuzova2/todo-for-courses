import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { AddItemForm } from '../../AddItemForm';
import { FilterType } from '../../App';
import { Button, Checkbox } from '@mui/material';
import { TaskItem } from '../taskItem/taskItem';


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
    changeFilter: (toDoListId: string, value: FilterType) => void
    addTask: (toDoListId: string, newText: string) => void
    changeCheckBox: (toDoListId: string, id: string, checked: boolean) => void//???
    filter: string
    id: string
    deleteToDoList: (id: string) => void
}


export function ToDoList({
    title,
    tasks,
    deleteTask,
    changeFilter,
    addTask,
    changeCheckBox,
    filter,
    id,
    deleteToDoList }: ToDoListType) {

    //вынесли хэндлер за пределы мапа, чтобы не ограничиваться скоупом. Для этого мы в хэндлере передаем в параметре айдишку в пределах мапа, а потом мы передаем в делит таск нужную айдишку таким образом , хоть и за пределами мапа
    const onDeleteHandler = (idItem: string) => {
        deleteTask(id, idItem)
    }
    //даже те функции которые в обработчиках в методе мап нужно облегчать - пишем прямо в мап функцию, которая будет считываться при нажатии на кнопку
    //задание- зарефакторить кселикс по этому методу


    const onClickHandler = (param: FilterType) => {
        changeFilter(id, param)
    }

  


    let mapFunction = tasks.map((el: TasksType) => {

       

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeCheckBox(id, el.id, e.currentTarget.checked);
        }


        return <div key={el.id}>
            <TaskItem
                checked={el.checked}
                task={el.task}
                onChangeHandler={onChangeHandler}
                onDeleteHandler={onDeleteHandler} />
        </div>
    })




    return (
        <div className="App">
            <div>
                <h3>{title}</h3>

                <AddItemForm id={id} deleteToDoList={deleteToDoList} addItem={addTask} />

                <ul>
                    {mapFunction}

                </ul>
                <div>
                    {/* <button name='delete' onClick={someFunction}>X</button>
                    <button name='save' onClick={someFunction}>X</button> */}

                    <Button color={'secondary'} variant={filter === 'All' ? 'outlined' : 'text'} onClick={() => onClickHandler('All')}>All</Button>
                    <Button variant={filter === 'Active' ? 'outlined' : 'text'} onClick={() => onClickHandler('Active')}>Active</Button>
                    <Button variant={filter === 'Completed' ? 'outlined' : 'text'} onClick={() => onClickHandler('Completed')}>Completed</Button>

                </div>
            </div>
        </div>
    );
}


