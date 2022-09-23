import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { ToDoList } from './ToDoList';



export type FilterType = 'All' | 'Active' | 'Completed'


export type ToDoListsType = {
    title: string,
    id: string,
    filter: FilterType
}


function App() {


    let toDoListId1 = v1()
    let toDoListId2 = v1()
    let toDoListId3 = v1()



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

    function changeCheckBox(toDoListId: string, id: string, checked: boolean) {


        setTasks({...tasksObj, [toDoListId]: tasksObj[toDoListId]
            .map(task => {
                return task.id === id ? {...task, checked: checked} : task
            })})
        //let tasks = tasksObj[toDoListId]
        //let task = tasks.find(t => t.id === id)
        //if (task) {
        //    task.checked = checked;
        //}
        //создаем видимость того, что здесь лежит что-то новое
        // let copy=[...tasks]
        // setTasks(copy)

        //сокращенный вариант
        // setTasks({...tasksObj, [toDoListId]: tasks})
  

    }

    let [filter, setFilter] = useState<FilterType>('Active')



    function addTask(toDoListId: string, newText: string) {
        let tasks = tasksObj[toDoListId]


        //if (newText.trim() !== '') {
            let newTask = {
                task: newText,//.trim(),
                id: v1(),
                description: '',
                checked: false,
            }


            setTasks({...tasksObj, [toDoListId]: [newTask, ...tasksObj[toDoListId]]})
        //}

    }

    function changeFilter( toDoListId: string, value: FilterType) {
        let toDoList = toDoLists.find((el) => el.id === toDoListId)
        if (toDoList) {
            toDoList.filter = value;
            setToDoList([...toDoLists])
        }
        setFilter(value)
    }

    //let tasksForFilter = tasksObj





    function deleteTask(toDoListId: string, id: string) {
        let tasks = tasksObj[toDoListId]
        let filtredTasks = tasks.filter((el) => { return el.id !== id })
        tasksObj[toDoListId] = filtredTasks
        setTasks({ ...tasksObj })


    }


    return (
        <div className="App">

            {
                toDoLists.map((el: any) => {

                    let tasksForToDoList = tasksObj[el.id]
                
                    


                    if (filter === 'Completed') {
                        //без ретурна!!! присваеваем фильтр
                        tasksForToDoList = tasksForToDoList.filter(
                            el => el.checked === true
                        )
                    }


                    if (filter === 'Active') {
                        tasksForToDoList = tasksForToDoList.filter(
                            el => el.checked === false
                        )
                    }


                    return <ToDoList
                        //не забудь добавить кей в мап
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={tasksForToDoList}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeCheckBox={changeCheckBox}
                        filter={el.filter} />
                })
            }

        </div>
    );
}


export default App;
