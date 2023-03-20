import { IconButton, TextField } from '@mui/material';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';


type NewType = {
    addItem: (title: string) => void
}

export type AddItemFormType = NewType


export const AddItemForm = React.memo(({ addItem }: AddItemFormType) => {

    let [value, setValue] = useState('')
    let [err, setErr] = useState('')
    const [disabledButtonState, setDisabledButtonState] = useState(false)




    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErr('')
        if (e.key === 'Enter') {
            plusButton()
        }
    }


    const plusButton = () => {

        if (value.trim() !== '') {
            setDisabledButtonState(true)
            addItem(value.trim());
            setValue('');
            setDisabledButtonState(false)
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
                <IconButton
                    onClick={plusButton}
                    disabled={disabledButtonState}
                    onKeyDown={() => onKeyDownHandler}>
                    <AddCircleIcon />
                </IconButton>

            </div>
        </div>
    );
}
)
