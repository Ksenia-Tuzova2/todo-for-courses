import {  useCallback } from 'react';
import { FilterType } from '../../App';
import { Button} from '@mui/material';
import { Rootstate, UseAppDispatch } from '../../store/redux-store';
import { changeFilterAc, StateTodoType } from '../../store/toDoListReduser';
import React from 'react';
import { useSelector } from 'react-redux';
import { sortTaskAC } from '../../store/tasksReduser';

export type FilterPropsType = {
    filter: FilterType
    todoId: string
}


export const Filter=React.memo(({
    filter,
    todoId }: FilterPropsType)=> {

    let dispatch = UseAppDispatch()

    
    const changeFilterHandler = useCallback(function(param: FilterType){
        dispatch(changeFilterAc(todoId, param))
        dispatch(sortTaskAC(todoId, param))
    },[dispatch])

    console.log('rerender filters');
    



    return (
      
                <div>
                    <Button color={'secondary'} variant={filter === 'All' ? 'outlined' : 'text'} onClick={() => changeFilterHandler('All')}>All</Button>
                    <Button variant={filter === 'Active' ? 'outlined' : 'text'} onClick={() => changeFilterHandler('Active')}>Active</Button>
                    <Button variant={filter === 'Completed' ? 'outlined' : 'text'} onClick={() => {changeFilterHandler('Completed')}}>Completed</Button>

                </div>
           
    );
})

