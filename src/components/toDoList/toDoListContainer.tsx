export let a=0
// import { Delete } from '@mui/icons-material';
// import IconButton from '@mui/material/IconButton';
// import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
// import { AddItemForm } from '../../AddItemForm';
// import { FilterType, ToDoListsType } from '../../App';
// import { Button, Checkbox } from '@mui/material';
// import { ToDoList } from './ToDoList';
// import { v1 } from 'uuid';


// export type TasksType = {
//     task: string,
//     id: string,
//     description: string,
//     checked: boolean,
// }

// export type ToDoListType = {
//     // title: string,
//     // tasks: Array<TasksType>,
//     // deleteTask: (toDoListId: string, id: string) => void,
//     // changeFilter: (toDoListId: string, value: FilterType) => void
//     // addTask: (toDoListId: string, newText: string) => void
//     // changeCheckBox: (toDoListId: string, id: string, checked: boolean) => void//???
//     // filter: string
//     // id: string
//     // deleteToDoList: (id: string) => void
// }


// export function ToDoListContainer({
 
// }: ToDoListType) {



//     //говорим сет туду чтобы фильтр залезал и менял значение  фильтров внутри обхектов
   

//     function deleteToDoList(id: string) {

//         //внимание - здесь легко запупаться, в массиве, который хранит таски и в массиве туду листов, используем тудулисты, так как в первую очередь мы удаляем именно его


//         // setToDoList(toDoLists.filter((el) => { return el.id !== id }))

//         // //нам нет смысла хранить таски для удаленного туду листа
//         // delete tasksObj[id]
//         // //обязательно вызываем сет, чтобы все поменялось
//         // setTasks({ ...tasksObj })

//     }




//     function changeCheckBox(toDoListId: string, id: string, checked: boolean) {

     

//     }

//     //удаляем общий фильр после того как мы разделили фильтры для разныз туду листов. но сетфильтр испольльзовался в чейндж фильтре. Поэтому мы будем там теперь получать айдишку тудулиста и менять фильтр в самом объекте туду листа
//     // let [filter, setFilter] = useState<FilterType>('Active')



//     function addTask(toDoListId: string, newText: string) {
//         // let tasks = tasksObj[toDoListId]

//         let newTask = {
//             task: newText,//.trim(),
//             id: v1(),
//             description: '',
//             checked: false,
//         }


//         // setTasks({ ...tasksObj, [toDoListId]: [newTask, ...tasksObj[toDoListId]] })


//     }


//     function changeFilter(toDoListId: string, value: FilterType) {
//         //ищем нужную айдишку туду листа
//         // let toDoList = toDoLists.find((el) => el.id === toDoListId)
//         // if (toDoList) {
//         //     //присваеваем текущему фильтру обновленное значение
//         //     toDoList.filter = value;
//         //     //обманываем что здесь новый массив за счет спред оператора
//         //     setToDoList([...toDoLists])
//         // }
//     }
//     //





        
//         const toDoListsMap= toDoLists.map((el: any) => {

//                 let tasksForToDoList = tasksObj[el.id]


//                 if (el.filter === 'Completed') {
//                     //без ретурна!!! присваеваем фильтр
//                     tasksForToDoList = tasksForToDoList.filter(
//                         el => el.checked === true
//                     )
//                 }


//                 if (el.filter === 'Active') {
//                     tasksForToDoList = tasksForToDoList.filter(
//                         el => el.checked === false
//                     )
//                 }

//                return <ToDoList
//                 title={el.title}
//                 tasks={el.tasks}
//                 deleteTask={()=>alert('')}
//                 changeFilter={changeFilter}
//                 addTask={addTask}
//                 changeCheckBox={changeCheckBox}
//                 filter={el.filter}
//                 id={el.id}
//                 deleteToDoList={deleteToDoList} />
               
//             })
        

//     return (
//        {toDoListsMap}
//     );
// }


