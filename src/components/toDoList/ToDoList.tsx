import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {  ChangeEvent, KeyboardEvent, useCallback, useEffect } from 'react';
import { AddItemForm } from '../AddItemForm';
import { FilterType } from '../../App';
import { Button} from '@mui/material';
import { TaskItem } from '../taskItem/taskItem';
import { Rootstate, UseAppDispatch } from '../../store/redux-store';
import {  addTaskRequest, changeChecBoxAC, removeTaskRequest,StateTasksType,taskRequestThunk,TasksType } from '../../store/tasksReduser';
import { removeTodoRequest } from '../../store/toDoListReduser';
import s from './todo.module.css';
import React from 'react';
import { Filter } from './filter';
import { useSelector } from 'react-redux';

export type ToDoListType = {
    // tasks: Array<any>,
    title: string,
    filter: FilterType,
    todoId: string
}


export const ToDoList=React.memo(({
    // tasks,
    title,
    filter,
    todoId }: ToDoListType)=> {

        const tasks = useSelector<Rootstate, TasksType[]>((state) => state.tasksReducer[todoId])

    let dispatch = UseAppDispatch()
//починить фильтр 
//починить делит запрос
    
    let sortedArray: Array<TasksType> = tasks

    if (filter === "Completed" ||filter === "Active") {

        sortedArray = tasks.filter((task: TasksType) =>filter === 'Completed' ? task.completed === true : task.completed === false)
    }

    useEffect(()=>{
        dispatch(taskRequestThunk(todoId))
    
    } , [])


    const onDeleteTodoHandler = useCallback(function(todoId: string){
        dispatch(removeTodoRequest(todoId))
        // dispatch(removeTasksRequest(todoId))
    },[dispatch])


    //вынесли хэндлер за пределы мапа, чтобы не ограничиваться скоупом. Для этого мы в хэндлере передаем в параметре айдишку в пределах мапа, а потом мы передаем в делит таск нужную айдишку таким образом , хоть и за пределами мапа
    const onDeleteTaskHandler = useCallback(()=>function(idItem: string){
        dispatch(removeTaskRequest(todoId, idItem))
    },[dispatch])
    //даже те функции которые в обработчиках в методе мап нужно облегчать - пишем прямо в мап функцию, которая будет считываться при нажатии на кнопку
    //задание- зарефакторить кселикс по этому методу


    


    let mapFunction = sortedArray?.map((el: TasksType) => {

  

        return <div key={el.id}>
            <TaskItem
                description={el.description}
                status={el.status}
                priority={el.priority}
                deadline={el.deadline}
                todoListId={el.todoListId}
                order={el.order}
                addedDate={el.addedDate}
                startDate={el.startDate}
                completed={el.completed}
                title={el.title}
                onDeleteHandler={onDeleteTaskHandler}
                id={el.id} />
        </div>
    })



    const addTaskHandler = (taskTitle: string) => {
       
        dispatch(addTaskRequest(taskTitle, todoId))
    }


    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                <div className={s.flexCointainer}>
                <AddItemForm addItem={addTaskHandler} />
                <Delete onClick={() => onDeleteTodoHandler(todoId)} />
                </div>
                <ul>
                    {mapFunction}
                </ul>
               <Filter 
               filter={filter} 
               todoId={todoId} />
            </div>
        </div>
    );
})


