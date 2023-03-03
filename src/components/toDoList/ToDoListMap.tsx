import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/redux-store';
import { ToDoList} from './ToDoList';
import {  StateTodoType } from '../../store/toDoListReduser';
import { StateTasksType } from '../../store/tasksReduser';
import s from './todo.module.css';
import { Paper, styled } from '@mui/material';
import { v1 } from 'uuid';
import React from 'react';

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

        console.log('todo  rerender');
        return (<div className={s.outTodoContainer} key={v1()}>
             <Item elevation={4}>
             <div className={s.innerTodoContainer}>
            <ToDoList
            tasks={tasks[el.id]}
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

