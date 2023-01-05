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
    // title: string,
    // tasks: Array<TasksType>,
    // deleteTask: (toDoListId: string, id: string) => void,
    // changeFilter: (toDoListId: string, value: FilterType) => void
    // addTask: (toDoListId: string, newText: string) => void
    // changeCheckBox: (toDoListId: string, id: string, checked: boolean) => void//???
    // filter: string
    // id: string
    // deleteToDoList: (id: string) => void
}


export function ToDoListContainer({
    // title,
    // tasks,
    // deleteTask,
    // changeFilter,
    // addTask,
    // changeCheckBox,
    // filter, id, deleteToDoList 
}: ToDoListType) {
    let toDoListId1 = v1()
    let toDoListId2 = v1()
    let toDoListId3 = v1()



    //говорим сет туду чтобы фильтр залезал и менял значение  фильтров внутри обхектов
    let [toDoLists, setToDoList] = useState<Array<ToDoListsType>>([
        {
            title: 'what to learn',
            id: toDoListId1,
            filter: 'All'
        },
        {
            title: 'what to buy',
            id: toDoListId2,
            filter: 'All'
        },
        {
            title: 'what i want',
            id: toDoListId3,
            filter: 'All'
        },
    ])

    let [tasksObj, setTasks] = useState({
        [toDoListId1]: [
            {
                task: 'js',
                id: v1(),
                description: 'something',
                checked: true,
            },
            {
                task: 'sccs',
                id: v1(),
                description: 'something',
                checked: true,
            },
            {
                task: 'html',
                id: v1(),
                description: 'something',
                checked: false,
            },
        ],
        //когда оборачиваем значение в квадратные скобки - значение само по себе становится ключом, а не тудулист2 становится ключом
        [toDoListId2]: [
            {
                task: 'books',
                id: v1(),
                description: 'something',
                checked: true,
            },
            {
                task: 'magazines',
                id: v1(),
                description: 'something',
                checked: true,
            },
        ],
        [toDoListId3]: [
            {
                task: 'food',
                id: v1(),
                description: 'something',
                checked: true,
            },
            {
                task: 'bakery',
                id: v1(),
                description: 'something',
                checked: true,
            },


        ],


    }
    )

    function deleteToDoList(id: string) {

        //внимание - здесь легко запупаться, в массиве, который хранит таски и в массиве туду листов, используем тудулисты, так как в первую очередь мы удаляем именно его


        setToDoList(toDoLists.filter((el) => { return el.id !== id }))

        //нам нет смысла хранить таски для удаленного туду листа
        delete tasksObj[id]
        //обязательно вызываем сет, чтобы все поменялось
        setTasks({ ...tasksObj })

    }


    function addToDoList(title: string) {

        let newlist: ToDoListsType = {
            title: title,
            id: v1(),
            filter: 'All'
        }

        setToDoList([newlist, ...toDoLists])

    }


    function changeCheckBox(toDoListId: string, id: string, checked: boolean) {


        setTasks({
            ...tasksObj, [toDoListId]: tasksObj[toDoListId]
                .map(task => {
                    return task.id === id ? { ...task, checked: checked } : task
                })
        })


    }

    //удаляем общий фильр после того как мы разделили фильтры для разныз туду листов. но сетфильтр испольльзовался в чейндж фильтре. Поэтому мы будем там теперь получать айдишку тудулиста и менять фильтр в самом объекте туду листа
    // let [filter, setFilter] = useState<FilterType>('Active')



    function addTask(toDoListId: string, newText: string) {
        // let tasks = tasksObj[toDoListId]

        let newTask = {
            task: newText,//.trim(),
            id: v1(),
            description: '',
            checked: false,
        }


        setTasks({ ...tasksObj, [toDoListId]: [newTask, ...tasksObj[toDoListId]] })


    }


    function changeFilter(toDoListId: string, value: FilterType) {
        //ищем нужную айдишку туду листа
        let toDoList = toDoLists.find((el) => el.id === toDoListId)
        if (toDoList) {
            //присваеваем текущему фильтру обновленное значение
            toDoList.filter = value;
            //обманываем что здесь новый массив за счет спред оператора
            setToDoList([...toDoLists])
        }
    }
    //





        
        const toDoListsMap= toDoLists.map((el: any) => {

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

               return <ToDoList
                title={el.title}
                tasks={el.tasks}
                deleteTask={()=>alert('')}
                changeFilter={changeFilter}
                addTask={addTask}
                changeCheckBox={changeCheckBox}
                filter={el.filter}
                id={el.id}
                deleteToDoList={deleteToDoList} />
               
            })
        

    return (
       {toDoListsMap}
    );
}


