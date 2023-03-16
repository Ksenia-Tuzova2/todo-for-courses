import { Delete } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import { Checkbox } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { changeChecBoxAC, changeTaskTitleRequest, PriorityTaskType, StatusTaskType, TasksType } from '../../store/tasksReduser';
import { UseAppDispatch } from '../../store/redux-store';
import React from 'react';


export type PropsTaskType = {
    // onChangeCheckBoxHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    onDeleteHandler: (idItem: string) => void,
}


export const TaskItem = React.memo(({
    //можно все данные распаковать в юзселекторе
    todoListId,
    completed,
    title,
    onDeleteHandler,
    id
}: PropsTaskType & TasksType) => {

    const dispatch = UseAppDispatch()
    const [editMode, setEditMode] = useState<boolean>(false)

    let [taskInputValue, setTaskInputValue] = useState<string>('')

    let [descriptionInputValue, setDescriptionInputValue] = useState<string>('')

    let [startDateInputValue, setStartDateInputValue] = useState<string>('')


    let [deadlineInputValue, setDeadlineInputValue] = useState<string>('')


    let [statusInputValue, setStatusInputValue] = useState<StatusTaskType>(0)

    let [priorityInputValue, setPriorityInputValue] = useState<PriorityTaskType>(0)

    let [orderInputValue, setOrderInputValue] = useState<number>(0)

    let [completedInputValue, setCompletedInputValue] = useState<boolean>(false)



    let upateInputValueChangeHandler = (newtext: string) => {
        setTaskInputValue(newtext)
    }

    let updatePriorityInputValueChangeHandler = (newValue: number) => {


    }


    const changeEditModeHandler: any = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
    }, [])

    const onBlurCallback = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        // выключить editMode при нажатии за пределами инпута
        setEditMode(false)

        //здесь что-то не то
        dispatch(changeTaskTitleRequest(id, todoListId, e.currentTarget.value))

    }, [dispatch])

    const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeChecBoxAC(e.currentTarget.checked, todoListId, id,))
    }



    return (
        <li className={completed ? 'completed' : ''}>

            {editMode ? (
                <>
                    <input
                        name='order'
                        // не понимаю почему намбер не работает
                        type={'number'}
                        placeholder='Add priority'
                        step='1'
                        min="0" max="10"
                        onChange={(e) => setOrderInputValue(+e.currentTarget.value)}
                        value={orderInputValue}
                        onBlur={onBlurCallback}
                    />
                    
                    <input
                    placeholder='Set title'
                        onChange={(e) => upateInputValueChangeHandler(e.currentTarget.value)}
                        value={taskInputValue}
                        onBlur={onBlurCallback} />
<br />
                    <textarea
                        name='decription'
                        placeholder='there is no description yet'
                        onChange={(e) => setDescriptionInputValue(e.currentTarget.value)}
                        value={descriptionInputValue}
                    />
                    <br />
                    Priority: <input
                        name='priority'
                        // не понимаю почему намбер не работает
                        type={'number'}
                        placeholder='Add priority'
                        step='1'
                        min="0" max="10"
                        onChange={(e) => setPriorityInputValue(+e.currentTarget.value)}
                        value={priorityInputValue}
                        onBlur={onBlurCallback}
                    />

<br />
                    Start date: <input
                        name='addDate'
                        type='date'
                        onChange={(e) => setStartDateInputValue(e.currentTarget.value)}
                        value={startDateInputValue}
                        onBlur={onBlurCallback}
                    />
<br />
                   Deadline: <input
                        name='deadline'
                        type='date'
                        onChange={(e) => setDeadlineInputValue(e.currentTarget.value)}
                        value={deadlineInputValue}
                        onBlur={onBlurCallback}
                    />
           <br />

                </>
            ) : (
                <span onDoubleClick={
                    (e) => changeEditModeHandler}>
                    {orderInputValue}.  {title}
                </span>
            )}

            <Checkbox
                checked={completed}
                onChange={(e) => changeCheckBoxHandler(e)}
            />
            <IconButton aria-label="delete"
                onClick={() => onDeleteHandler(id)}>
                <Delete />
            </IconButton>

            <IconButton aria-label="create"
                onClick={() => changeEditModeHandler()}
                onBlur={() => onBlurCallback}
            >
                <CreateIcon />
            </IconButton>

        </li>)
}
)

