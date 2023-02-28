import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, padding } from '@mui/system';
import { AddItemForm } from './components/AddItemForm';
import './App.css';
import Grid from '@mui/material/Grid';
import { UseAppDispatch } from './store/redux-store';
import { addTodoRequest } from './store/toDoListReduser';
import { ToDoListMap } from './components/toDoList/ToDoListMap';
import { useEffect } from 'react';
import { authUserDataRequest } from './store/authReduser';

export type FilterType = 'All' | 'Active' | 'Completed'


export type ToDoListsType = {
    title: string,
    id: string,
    filter: FilterType
}


function App() {

    const dispatch = UseAppDispatch();

    function addToDoList(title: string) {
        dispatch(addTodoRequest(title))
    }

    useEffect(() => {
        dispatch(authUserDataRequest())
      },[])
      
    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'>
                        Todo list
                    </Typography>
                    <Button >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '10px 0px' }} >
                    <AddItemForm addItem={addToDoList} />
                </Grid>
                <Grid container spacing={3}>
                    <ToDoListMap />
                </Grid>
            </Container>
        </div>
    );
}


export default App;
