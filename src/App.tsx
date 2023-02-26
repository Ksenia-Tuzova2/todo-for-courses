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
import { useAppDispatch } from './store/redux-store';
import { addTodoAC } from './store/toDoListReduser';
import { ToDoListMap } from './components/toDoList/ToDoListMap';

export type FilterType = 'All' | 'Active' | 'Completed'
    
    
export type ToDoListsType = {
    title: string,
    id: string,
    filter: FilterType
}


function App() {

    const dispatch = useAppDispatch();

    function addToDoList(title: string) {
        dispatch(addTodoAC(title))
    }
    

    

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
                   <ToDoListMap/>
                </Grid>
            </Container>
        </div>
    );
}


export default App;
