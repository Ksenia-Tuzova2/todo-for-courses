import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, padding } from '@mui/system';
import React, { ChangeEvent, useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';

import { ToDoList } from './components/toDoList/ToDoList';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ToDoListContainer } from './components/toDoList/toDoListContainer';



export type FilterType = 'All' | 'Active' | 'Completed'


export type ToDoListsType = {
    title: string,
    id: string,
    filter: FilterType
}

///
function App() {


   


    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '10px 0px' }} >
                    <AddItemForm  addItem={addToDoList} />
                </Grid>
                <Grid container spacing={3}>
                    {/* <ToDoListContainer /> */}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
