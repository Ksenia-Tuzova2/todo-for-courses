import { v1 } from "uuid"

export function  hairDresser(userHair:number,power:number){
 return  userHair/power
}

export function  moveUser(user:any,city:string){
  //почему так нельзя делать копию? copy=user
  //потому что это будет просто ссылкой, а не отдельным объектом
//   const copy={...user}
//   copy.adress={...copy.adress, nameOfCity:city}
// return copy

return {...user,
  adress:{...user.adress, nameOfCity:city}}
 }

 export function  upgradeLaptop(user:any,laptop:string){
 
return {...user,
gadgets:{
  ...user.gadgets,
  laptop:laptop
}}
 }

 export function  addCompany(user:any,newCompany:string){
  return {...user,company:[...user.company,{id:v1(),name:newCompany}]}
 }

 export function  updateCompany(user:any,id:string,newCompany:string){
  return {...user,company:[...user.company.map((el:any)=>el.id===id?{...el,name:newCompany}:el)]}
 }