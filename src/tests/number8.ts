export function  hairDresser(userHair:number,power:number){
 return  userHair/power
}

export function  moveUser(user:any,city:string){
  //почему так нельзя делать копию? copy=user
  const copy={...user}
  copy.adress={...copy.adress, nameOfCity:city}
return copy
 }