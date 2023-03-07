import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Checkbox } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { changeChecBoxAC, changeTaskTitleRequest, TasksType } from '../../store/tasksReduser';
import { UseAppDispatch } from '../../store/redux-store';
import React from 'react';


export type PropsTaskType = {
    // onChangeCheckBoxHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    onDeleteHandler: (idItem: string) => void,
}


export const TaskItem=React.memo(({
    description,
    status,
    priority,
    deadline,
    todoListId,
    order,
    addedDate,
    startDate,
    completed,
    title,
    onDeleteHandler,
    id
}: PropsTaskType & TasksType)=> {

    const dispatch = UseAppDispatch()
    const [editMode, setEditMode] = useState<boolean>(false)

    let [taskInputValue, setTaskInputValue]=useState('')

    let upateInputValueChangeHandler = (newtext: string) => {
        setTaskInputValue(newtext)
    }


    const changeTitleTaskHandler: any = useCallback(()=>function(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        setEditMode(true)
        // включить editMode при двойном клике

        //что это??
        // onDoubleClick && onDoubleClick(e)
    },[])

    const onBlurCallback = useCallback(()=>function(e: React.FocusEvent<HTMLInputElement>) {
        setEditMode(false) // выключить editMode при нажатии за пределами инпута
        dispatch(changeTaskTitleRequest(id, todoListId, e.currentTarget.value))

    },[dispatch])

    const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeChecBoxAC(e.currentTarget.checked, todoListId,id,))
    }


    return (
        <li className={completed ? 'completed' : ''}>

            {editMode ? (
                <input
                onChange={(e)=>upateInputValueChangeHandler(e.currentTarget.value)}
                value={taskInputValue}
                 onBlur={onBlurCallback} />
            ) : (
                <span onDoubleClick={changeTitleTaskHandler}>{title}</span>
            )}

            <Checkbox
                checked={completed}
                onChange={(e)=>changeCheckBoxHandler(e)}
            />
            <IconButton aria-label="delete" onClick={() => onDeleteHandler(id)}>
                <Delete />
            </IconButton>
        </li>)
}
)

