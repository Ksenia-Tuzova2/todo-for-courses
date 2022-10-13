import React, { useState, ChangeEvent, KeyboardEvent} from 'react';



export type AddItemFormType = {
    addItem: ( toDoListId: string,title: string) => void 
    id:string
    deleteToDoList:(id:string)=>void
    addToDoList:(title:string)=>void
}


export function AddItemForm({ addItem, id ,deleteToDoList,addToDoList}: AddItemFormType) {

    
        let [value, setValue] = useState('')
    
        let [err,setErr]=useState('')
    
   
        const onChabgeHandlerElement = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.currentTarget.value) }
    
        const plusButton = () => {
            
            if(value.trim()!==''){
                //убираем айдишку
                addItem( id, value.trim()); 
                setValue('');
            } else setErr('err')
        
           
        }
       
            const onDeleteListClickHandler=()=>{        
             deleteToDoList(id)   
            }
    
            const onaddToDoListClickHandler=()=>{        
              
               }
       
       
        const onKeyDownHandler= (e: KeyboardEvent<HTMLInputElement>) =>{
            setErr('')
            if (e.key === 'Enter') {
                plusButton()
            }
        }
        return (
     
                <div>
           
                    <button onClick={onDeleteListClickHandler}>x</button>
                    <div>
                        <input value={value} onChange={onChabgeHandlerElement
                        } onKeyPress={onKeyDownHandler} className={err&&'erorr'}/>
                        <button onClick={plusButton}>+</button>
                    </div>
                    {err&& <div className="err">erorr</div>}
                   
                </div>
   
        );
    }
    