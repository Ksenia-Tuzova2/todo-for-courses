import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { error } from 'console';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export type AddItemFormType = {
    addItem: (toDoListId: string, title: string) => void
    id: string
    deleteToDoList: (id: string) => void
    addToDoList: (title: string) => void
}


export function AddItemForm({ addItem, id, deleteToDoList, addToDoList }: AddItemFormType) {


    let [value, setValue] = useState('')

    let [err, setErr] = useState('')


    const onChabgeHandlerElement = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.currentTarget.value) }

    const plusButton = () => {

        if (value.trim() !== '') {
            //убираем айдишку
            addItem(id, value.trim());
            setValue('');
        } else setErr('err')


    }

    const onDeleteListClickHandler = () => {
        deleteToDoList(id)
    }

    const onaddToDoListClickHandler = () => {

    }


    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErr('')
        if (e.key === 'Enter') {
            plusButton()
        }
    }
    return (

        <div>



            <div>

                <TextField id="outlined-size-small"
                error={!!err}
                helperText={err}
                    defaultValue="Small"
                    size="small" label='type something' value={value} onChange={onChabgeHandlerElement
                    } onKeyPress={onKeyDownHandler}/>
                <IconButton onClick={plusButton}><AddCircleIcon/></IconButton>
                <Button onClick={onDeleteListClickHandler} startIcon={<DeleteIcon />}>
                </Button>
            </div>
            {/* //заменили хэлпертекстом */}
            {/* {err && <div className="err">erorr</div>} */}

        </div>

    );
}
