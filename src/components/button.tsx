import React, { useState } from 'react';
import { v1 } from 'uuid';





export type FilterType = 'All' | 'Active' | 'Completed'


export type ButtonType = {
    name: string,
    callBack:()=>void
    className:any
}


export function Button({name, callBack, className}:ButtonType) {

    const onClickHandler=()=>{
        callBack()
    }

    return (
        <button className={className} onClick={()=>onClickHandler()}>
         {name}
        </button>
    );
}



