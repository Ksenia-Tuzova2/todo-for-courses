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
import Paper from '@mui/material/Paper';
import { v1 } from 'uuid';
import { useAppDispatch, useAppSelector } from './store/redux-store';
import { addTodoActionCreator } from './store/toDoListReduser';
import { ToDoList } from './components/toDoList/ToDoList';

export type FilterType = 'All' | 'Active' | 'Completed'
    
    
export type ToDoListsType = {
    title: string,
    id: string,
    filter: FilterType
}


function App() {

    const dispatch = useAppDispatch();

    const todoList = useAppSelector((state) => state.toDoListReduser)

    const tasks = useAppSelector((state) => state.tasksReducer)
   
    function addToDoList(title: string) {
    
        dispatch(addTodoActionCreator(title))
    
    }
    
    console.log(todoList);

    console.log(tasks);
    
    

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
                    <AddItemForm  addItem={addToDoList} />
                </Grid>
                <Grid container spacing={3}>
                   
                </Grid>
            </Container>
        </div>
    );
}


export default App;
