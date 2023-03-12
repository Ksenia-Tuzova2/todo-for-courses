import { Paper, styled } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/redux-store';
import { StateTodoType } from '../../store/toDoListReduser';
import s from './todo.module.css';
import { ToDoList } from './ToDoList';

//данные принимаем через юз селектор - используем юз диспатч при вызове экшн креэторов


export const ToDoListMap = React.memo(() => {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        lineHeight: '60px',
    }));




    const todoArray = useSelector<Rootstate, Array<StateTodoType>>(state => state.toDoListReduser as any)


    let mapFunction = todoArray.map((el) => {
        return (<div className={s.outTodoContainer} key={el.id}>
            <Item elevation={4}>
                <div className={s.innerTodoContainer}>
                    <ToDoList
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

