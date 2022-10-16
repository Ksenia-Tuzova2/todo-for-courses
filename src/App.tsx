import React, { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
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
        
        let filtredToDoLists = toDoLists.filter((el) => { return el.id !== id })
        
        setToDoList(filtredToDoLists)

        //нам нет смысла хранить таски для удаленного туду листа
        delete tasksObj[id]
        //обязательно вызываем сет, чтобы все поменялось
        setTasks({...tasksObj})

    }

  
    function addToDoList(title: string) {

       let newlist={
        title: title,
        id:v1(),
        filter: 'All'
    }


    setTasks({ ...tasksObj, [newlist.id]: [] })

       }


    function changeCheckBox(toDoListId: string, id: string, checked: boolean) {


        setTasks({
            ...tasksObj, [toDoListId]: tasksObj[toDoListId]
                .map(task => {
                    return task.id === id ? { ...task, checked: checked } : task
                })
        })
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

    //удаляем общий фильр после того как мы разделили фильтры для разныз туду листов. но сетфильтр испольльзовался в чейндж фильтре. Поэтому мы будем там теперь получать айдишку тудулиста и менять фильтр в самом объекте туду листа
    // let [filter, setFilter] = useState<FilterType>('Active')



    function addTask( newText: string) {
        // let tasks = tasksObj[toDoListId]

        let newTask = {
            task: newText,//.trim(),
            id: v1(),
            description: '',
            checked: false,
        }


        setTasks({ ...tasksObj, [v1()]: [newTask, ...tasksObj[v1()]] })


    }


    //здесть получаем айдишник туду листа чтобы переписать потом фильтр
    function changeFilter(toDoListId: string, value: FilterType) {
        //ищем адишку которую надо удалить
        let toDoList = toDoLists.find((el) => el.id === toDoListId)
        if (toDoList) {
            //присваеваем текущему фильтру обновленное значение
            toDoList.filter = value;
            //обманываем что здесь новый массив за счет спред оператора
            setToDoList([...toDoLists])
        }
    }
    //



    function deleteTask(toDoListId: string, id: string) {
        // let tasks = tasksObj[toDoListId]
        // let filtredTasks = tasks.filter((el) => { return el.id !== id })
        // tasksObj[toDoListId] = filtredTasks
        // setTasks({ ...tasksObj })

setTasks({...tasksObj,[toDoListId]:tasksObj[toDoListId].filter(el=>el.id !== id)})

    }



    return (
        <div className="App">
            <AddItemForm deleteToDoList={deleteToDoList} id='' addItem={addTask} addToDoList={addToDoList}/>

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


                    return <ToDoList
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
                })
            }

        </div>
    );
}


export default App;
