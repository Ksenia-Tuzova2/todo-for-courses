import { ThunkAction } from "redux-thunk"
import { authApi } from "../api/authApi"

const SET_USER_DATA='SET_USER_DATA'
const SET_FETCH='SET_FETCH'

//не использовать расширение жсх для редьюсеров - могут быть баги


export type AuthInitStateType = {
  id: number|null,
  email: string|null,
  login: string|null,
  isFetching:boolean,
  isAuth:boolean,
}

const SearchUserInitState: AuthInitStateType = {
  id: null,
  email: null,
  login: null,
  isFetching:false,
  isAuth:false,
}

export type DataType={
  id: number,
  email: string,
  login: string,
}



export const authReduser = (state: AuthInitStateType = SearchUserInitState, action: AuthAciontsType): AuthInitStateType => {
  switch (action.type) {
   
  
    case SET_USER_DATA: {
      //мы перезатираем копию инишал стейта новым значением дата - там тоже есть логин айди и все что нужно стейту
      return { ...state, ...action.data , isAuth:true,};
    }
    case SET_FETCH: {
      return { ...state, isFetching:action.isFetching };
    }
    default: {
      return state
    }
  }
}

type AuthAciontsType = ReturnType<typeof setUserData> | ReturnType<typeof setFetch> 

export const setUserData = ({id, email, login}:DataType) => {

  return { type: SET_USER_DATA , data:{id, email, login} } as const
}


export const setFetch = (isFetching: boolean) => {
  return { type: SET_FETCH, isFetching } as const
}







  //чтобы получить свои данные и прокинуть их потом в профайл
  // мы делаем запрос через юзэффект, который заменяет componentDidMount()
  //так же мы юзаем диспатч из реакт-редакса 
  //диспатч позволяет нам использовать редьюсеры , 
  //которые используются только в комбанредьюсере, 
  //чтобы далее передать в стор эти функции. 
  //Но тут мы можем не вызывать стор(который прокинули через провайдер),
  // используем диспатч- он пробежится по всем редьюсерам
  // и найдет нужный экшн тайп, выполнит его

export const authUserDataRequest=():ThunkAction<void,{},{}, any>=>{
  
  return function (dispatch:any):void{

    authApi.authRequest().then((data: any) => {
    
      // (0 if opearation completed successfullt, other numbers - some error occured)
      if (data.resultCode === 0) {
        let { id, email, login } = data.data
        dispatch(setUserData({ id, email, login })) 
             }
    }).catch((error:string) => {
      // handle error
      console.log(error);
    }
    )
  }
}

