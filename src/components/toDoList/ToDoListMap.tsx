import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/redux-store';
import { ToDoList, ToDoListType } from './ToDoList';
import { useDispatch } from 'react-redux';
import {  removeTodoAC } from '../../store/toDoListReduser';


//функции принимаем на прямую из экшн крейтора из файла с редьюсером, а данным принимаем через юз селектор - используем юз диспатч при вызове экшн креэторов


export function ToDoListMap() {

    const todoArray = useSelector<Rootstate, any>(state => state.toDoListReduser as any)

    const tasks = useSelector<Rootstate, any>((state) => state.tasksReducer as any)


    let dispatch = useDispatch()

    //вынесли хэндлер за пределы мапа, чтобы не ограничиваться скоупом. Для этого мы в хэндлере передаем в параметре айдишку в пределах мапа, а потом мы передаем в делит таск нужную айдишку таким образом , хоть и за пределами мапа
    const onDeleteTodoHandler = (idItem: string) => {
        dispatch(removeTodoAC(idItem))
    }


    let mapFunction = todoArray.map((el: any) => {
        return (<ToDoList
            tasks={tasks[el.id]}
            title={el.title}
            filter={el.filter}
            todoId={el.id}
            deleteToDoList={onDeleteTodoHandler} />
        )
    })


    return (
        <div className="">
            {mapFunction}
        </div>
    );
}


