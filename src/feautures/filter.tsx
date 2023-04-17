import { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { UseAppDispatch } from '../store/redux-store';
import { changeFilterAc, FilterType } from '../store/toDoListReduser';
import React from 'react';

export type FilterPropsType = {
    filter: FilterType,
    todoId: string
}


export const Filter = React.memo(({
    filter,
    todoId }: FilterPropsType) => {

    let dispatch = UseAppDispatch()
    const [disabledButtonState, setDisabledButtonState] = useState(false)





    const changeFilterHandler = useCallback((param: FilterType) => {

        setDisabledButtonState(true)
        dispatch(changeFilterAc(todoId, param))
        setDisabledButtonState(false)

    }, [])




    return (

        <div>
            <Button
                disabled={disabledButtonState}
                color={'secondary'}
                variant={filter === 'All' ? 'outlined' : 'text'}
                onClick={() => changeFilterHandler('All')}>
                All
            </Button>

            <Button
                disabled={disabledButtonState}
                variant={filter === 'Active' ? 'outlined' : 'text'}
                onClick={() => changeFilterHandler('Active')}>Active
            </Button>

            <Button
                disabled={disabledButtonState}
                variant={filter === 'Completed' ? 'outlined' : 'text'}
                onClick={() => { changeFilterHandler('Completed') }} >
                Completed
            </Button>

        </div>

    );
})


