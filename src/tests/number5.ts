export const getStreetsTitlesOfGovernmentBuildings=(array:Array<Object>)=>{

  
return array.map((el:any)=>el.name)
}

export const getStreetsTitlesOfHouses=(array:any)=>{
 return array.map((el:any)=>el.name)
  }