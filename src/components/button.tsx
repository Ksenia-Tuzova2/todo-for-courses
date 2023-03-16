
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



