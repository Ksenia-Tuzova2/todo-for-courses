import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { AddItemForm } from '../AddItemForm';
import { FilterType } from '../../App';
import { Button, Checkbox } from '@mui/material';
import { TaskItem } from '../taskItem/taskItem';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/redux-store';
import { ToDoListType } from './ToDoList';
import { useDispatch } from 'react-redux';


//функции принимаем на прямую из экшн крейтора из файла с редьюсером, а данным принимаем через юз селектор - используем юз диспатч при вызове экшн креэторов


export function ToDoListMap(
//     {
//     title,
//     tasks,
//     deleteTask,
//     changeFilter,
//     addTask,
//     changeCheckBox,
//     filter,
//     id,
//     deleteToDoList 
// }: ToDoListType
)
 {

    const meId = useSelector<RootState,number>(state => state.authReduser.id as number)






    //вынесли хэндлер за пределы мапа, чтобы не ограничиваться скоупом. Для этого мы в хэндлере передаем в параметре айдишку в пределах мапа, а потом мы передаем в делит таск нужную айдишку таким образом , хоть и за пределами мапа
    const onDeleteHandler = (idItem: string) => {
       useDispatch (deleteTask(id, idItem))
    }
    //даже те функции которые в обработчиках в методе мап нужно облегчать - пишем прямо в мап функцию, которая будет считываться при нажатии на кнопку
    //задание- зарефакторить кселикс по этому методу


    const onClickHandler = (param: FilterType) => {
        changeFilter(id, param)
    }




    let mapFunction = todoList.map((el) => {
        return (<ToDoList
            title={el.title}
            tasks={tasks[el.id]}
            deleteTask={() => alert('')}
            changeFilter={() => { }}
            addTask={() => { }}
            changeCheckBox={() => { }}
            filter={el.filter}
            id={el.id}
            deleteToDoList={() => { }} />
        )
    })





    return (
        <div className="">
            {mapFunction}
        </div>
    );
}


