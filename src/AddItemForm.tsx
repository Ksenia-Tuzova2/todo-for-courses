import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';


type NewType = {
    deleteItem: () => void;
    addItem: (title: string) => void
};

export type AddItemFormType = NewType


export function AddItemForm({ addItem,  deleteItem }: AddItemFormType) {


    let [value, setValue] = useState('')

    let [err, setErr] = useState('')


    // const onChabgeHandlerElement = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.currentTarget.value) }



    const onDeleteListClickHandler = () => {
        deleteItem()
    }



    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErr('')
        if (e.key === 'Enter') {
            plusButton()
        }
    }


    const plusButton = () => {
        if (value.trim() !== '') {
            addItem(value.trim());
            setValue('');
        } else setErr('err')
    }


    const onChabgeHandlerElement = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.currentTarget.value) }

    return (
        <div>
            <div>
                <TextField id="outlined-size-small"
                    error={!!err}
                    helperText={err}
                    defaultValue="Small"
                    size="small" label='type something'
                    value={value}
                    onChange={onChabgeHandlerElement
                    } />
                <IconButton onClick={() => plusButton()}>
                    <AddCircleIcon />
                </IconButton>
                <Button
                    onClick={onDeleteListClickHandler}
                    startIcon={<DeleteIcon />}>
                </Button>
            </div>
        </div>
    );
}
