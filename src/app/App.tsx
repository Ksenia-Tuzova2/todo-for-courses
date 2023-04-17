import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';

import { AddItemForm } from '../components/AddItemForm';
import './App.css';
import { UseAppDispatch } from '../store/redux-store';
import { addTodoRequest, todoDataRequest } from '../store/toDoListReduser';
import { ToDoListMap } from '../components/toDoList/ToDoListMap';
import { authUserDataRequest } from '../store/authReduser';
import { LoadingSpiner } from '../feautures/loadingSpiner/loadingSpiner';




function App() {

    //загрузка
    let [isFetching, setIsFetching] = useState(false)

    const dispatch = UseAppDispatch();

    function addToDoList(title: string) {
        dispatch(addTodoRequest(title))
    }

    useEffect(() => {
        setIsFetching(true)
        dispatch(authUserDataRequest())
        dispatch(todoDataRequest())
        setIsFetching(false)
    }, [])

    const showDownload = () => {
        if (isFetching === true) {
            return <LoadingSpiner />
        } else return <></>
    }

    return (
        <div className="App">

            {(isFetching === false) && <>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='menu'>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6'>
                            Todo list
                        </Typography>
                        <Button >Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container
                        style={{ padding: '10px 0px' }}>
                        <AddItemForm addItem={addToDoList} />
                    </Grid>
                    <Grid container spacing={3}>
                        <ToDoListMap />
                    </Grid>
                </Container>
            </>
            }
            {(isFetching === true) && showDownload()}
        </div>
    );
}


export default App;
