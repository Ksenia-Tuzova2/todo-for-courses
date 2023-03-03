import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {  ChangeEvent, KeyboardEvent, useCallback } from 'react';
import { AddItemForm } from '../AddItemForm';
import { FilterType } from '../../App';
import { Button} from '@mui/material';
import { TaskItem } from '../taskItem/taskItem';
import { UseAppDispatch } from '../../store/redux-store';
import { addTaskAC, changeChecBoxAC, removeTaskRequest,TasksType } from '../../store/tasksReduser';
import { changeFilterAc, removeTodoRequest } from '../../store/toDoListReduser';
import s from './todo.module.css';
import React from 'react';
import { Filter } from './filter';

export type ToDoListType = {
    tasks: Array<any>,
    title: string,
    filter: FilterType,
    todoId: string
}


export const ToDoList=React.memo(({
    tasks,
    title,
    filter,
    todoId }: ToDoListType)=> {

    let dispatch = UseAppDispatch()



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



    let mapFunction = tasks.map((el: TasksType) => {

        console.log('tasks  rerender');
        
  

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



    const addTaskHandler = useCallback(()=>function(taskTitle: string){
        dispatch(addTaskAC(taskTitle, todoId))
    },[dispatch])


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


