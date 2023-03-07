import { useSelector } from 'react-redux';
import { dispatch, Rootstate, UseAppDispatch } from '../../store/redux-store';
import { ToDoList} from './ToDoList';
import {  StateTodoType, todoDataRequest } from '../../store/toDoListReduser';
import { StateTasksType, TasksType } from '../../store/tasksReduser';
import s from './todo.module.css';
import { Paper, styled } from '@mui/material';
import { v1 } from 'uuid';
import React from 'react';
import { useDispatch } from 'react-redux';

//данные принимаем через юз селектор - используем юз диспатч при вызове экшн креэторов


export const ToDoListMap=React.memo(()=> {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        lineHeight: '60px',
      }));
      

    const todoArray = useSelector<Rootstate, Array<StateTodoType>>(state => state.toDoListReduser as any)

    const tasks = useSelector<Rootstate, StateTasksType>((state) => state.tasksReducer as any)



  //вынесли хэндлер за пределы мапа, чтобы не ограничиваться скоупом. Для этого мы в хэндлере передаем в параметре айдишку в пределах мапа, а потом мы передаем в делит таск нужную айдишку таким образом , хоть и за пределами мапа
   


    let mapFunction = todoArray.map((el: any) => {

       
 
//Я СМОГЛАААА : надо было фильтровать не в стейте в редьюсере, а тут, чтобы инишл не перезатирался
let sortedArray:Array<TasksType>  = tasks[el.id]

if (el.filter === "Completed" || el.filter === "Active") {

    sortedArray= sortedArray.filter((task: TasksType) => el.filter === 'Completed' ? task.completed === true : task.completed === false)
}


        console.log('todo  rerender');
        return (<div className={s.outTodoContainer} key={v1()}>
             <Item elevation={4}>
             <div className={s.innerTodoContainer}>
            <ToDoList
            tasks={
                sortedArray
                // tasks[el.id]
            }
            title={el.title}
            filter={el.filter}
            todoId={el.id}
         />
          </div>
         </Item>
         </div>
     
        )
    })


    return (
        <div className={s.flexCointainer}>
            {mapFunction}
        </div>
    );
}
)

