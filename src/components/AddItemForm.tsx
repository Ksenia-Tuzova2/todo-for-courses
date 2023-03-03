import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';


type NewType = {
    addItem: (title: string) => void
};

export type AddItemFormType = NewType


export const AddItemForm=React.memo(({ addItem}: AddItemFormType)=> {

    console.log('form  rerender');
    let [value, setValue] = useState('')

    let [err, setErr] = useState('')



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
                    size="small" label='type something'
                    value={value}
                    onChange={onChabgeHandlerElement
                    } />
                <IconButton onClick={plusButton}
                onKeyDown={()=>onKeyDownHandler}>
                    <AddCircleIcon   />
                </IconButton>
        
            </div>
        </div>
    );
}
)
