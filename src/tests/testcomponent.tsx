import React, { useState, ChangeEvent, KeyboardEvent} from 'react';
import { ManType } from './number7.test';



export type PropsType = {
    food:any,
  title:string,
  man:ManType,
}


export const AddItemFor:React.FC<PropsType>=({food,...props})=> {

    let {title, man:{name}}=props

        return (
     
                <div>
                 <h1>{title}</h1>
                  {name}
                </div>
   
        );
    }
    