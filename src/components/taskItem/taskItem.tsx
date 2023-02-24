import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {  Checkbox } from '@mui/material';
import { ChangeEvent } from 'react';


export type taskType = {
    checked:boolean,
    task:string,
    onChangeHandler:(e: ChangeEvent<HTMLInputElement>)=>void,
    onDeleteHandler:(idItem: string)=>void,
    id:string,
}


export function TaskItem({
    checked,
    task,
    onChangeHandler,
    onDeleteHandler,
    id
 }: taskType) {



    return (
        <li className={checked ? 'checked' : ''}>
            <Checkbox
                checked={checked}
                onChange={onChangeHandler}
            />
            <span>{task}</span>
            <IconButton aria-label="delete" onClick={() => onDeleteHandler(id)}>
                <Delete />
            </IconButton>
        </li>)
}


