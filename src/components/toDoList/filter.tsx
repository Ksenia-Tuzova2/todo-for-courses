import {  useCallback } from 'react';
import { Button} from '@mui/material';
import {  UseAppDispatch } from '../../store/redux-store';
import { changeFilterAc, FilterType } from '../../store/toDoListReduser';
import React from 'react';

export type FilterPropsType = {
    filter: FilterType,
    todoId: string
}


export const Filter=React.memo(({
    filter,
    todoId }: FilterPropsType)=> {

    let dispatch = UseAppDispatch()

    
    const changeFilterHandler = useCallback(function(param: FilterType){
        dispatch(changeFilterAc(todoId, param))
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


