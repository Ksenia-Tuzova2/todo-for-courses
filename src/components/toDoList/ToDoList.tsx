import { Delete } from '@mui/icons-material';
import {  useCallback } from 'react';
import { AddItemForm } from '../AddItemForm';
import { TaskItem } from '../taskItem/taskItem';
import { Rootstate, UseAppDispatch } from '../../store/redux-store';
import {  addTaskRequest, removeTaskRequest,TasksType } from '../../store/tasksReduser';
import { removeTodoRequest, StateTodoType } from '../../store/toDoListReduser';
import s from './todo.module.css';
import React from 'react';
import { Filter } from './filter';
import { useSelector } from 'react-redux';

export type ToDoListPropsType = {
    todoId: string
}

export const ToDoList=React.memo(({
    todoId }: ToDoListPropsType)=> {

        const tasks = useSelector<Rootstate, TasksType[]>((state) => state.tasksReducer[todoId])

const {filter, title}=useSelector<Rootstate, StateTodoType>(
    (state=>state.toDoListReduser
        .find(todo=>todoId===todo.id)!)
)

    let dispatch = UseAppDispatch()


    
    let sortedArray: Array<TasksType> = tasks

    if (filter === "Completed" ||filter === "Active") {

        sortedArray = tasks.filter((task: TasksType) =>filter === 'Completed' ? task.completed === true : task.completed === false)
    }


    const onDeleteTodoHandler = useCallback(function(todoId: string){
        dispatch(removeTodoRequest(todoId))
        // dispatch(removeTasksRequest(todoId))
    },[dispatch])


   
    const onDeleteTaskHandler = useCallback((idItem: string)=>{
        dispatch(removeTaskRequest(todoId, idItem))
    },[dispatch])


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


