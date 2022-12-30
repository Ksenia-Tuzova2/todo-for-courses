import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { AddItemForm } from '../../AddItemForm';
import { FilterType } from '../../App';
import { Button, Checkbox } from '@mui/material';
import { ToDoList } from './ToDoList';


export type TasksType = {
    task: string,
    id: string,
    description: string,
    checked: boolean,
}

export type ToDoListType = {
    title: string,
    tasks: Array<TasksType>,
    deleteTask: (toDoListId: string, id: string) => void,
    changeFilter: (toDoListId: string, value: FilterType) => void
    addTask: (toDoListId: string, newText: string) => void
    changeCheckBox: (toDoListId: string, id: string, checked: boolean) => void//???
    filter: string
    id: string
    deleteToDoList: (id: string) => void
}


export function toDoListContainer({
    title,
    tasks,
    deleteTask,
    changeFilter,
    addTask,
    changeCheckBox,
    filter, id, deleteToDoList }: ToDoListType) {

        {
            toDoLists.map((el: any) => {

                let tasksForToDoList = tasksObj[el.id]


                if (el.filter === 'Completed') {
                    //без ретурна!!! присваеваем фильтр
                    tasksForToDoList = tasksForToDoList.filter(
                        el => el.checked === true
                    )
                }


                if (el.filter === 'Active') {
                    tasksForToDoList = tasksForToDoList.filter(
                        el => el.checked === false
                    )
                }


                return <Grid item>
                    <Paper style={{ padding: '10px' }} variant="outlined" >
                        <ToDoList
                            //не забудь добавить кей в мап
                            key={el.id}
                            //добавляем айди туду листа чтобы фильтр знал в каком именно туду листе будет новый фильтр. Затем мы передаем этот айдишник в хэндлеры кнопок фильтров
                            id={el.id}
                            title={el.title}
                            tasks={tasksForToDoList}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeCheckBox={changeCheckBox}
                            filter={el.filter}
                            deleteToDoList={deleteToDoList} />
                    </Paper>
                </Grid>
            })
        }

    return (
        <ToDoList
            title={title}
            tasks={tasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeCheckBox={changeCheckBox}
            filter={filter}
            id={id}
            deleteToDoList={deleteToDoList} />
    );
}


