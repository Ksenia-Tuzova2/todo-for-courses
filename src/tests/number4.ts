export function demolishHousesOnTheStreet(newCity:any, streetName:string){
  newCity.houses=newCity.houses.filter((e:any)=> e.name!==streetName)
return newCity.houses
}

export function getBuildingsWithStaffCountGreaterThen(governmentBuildings:any, staff:number){
let filterBuildings=governmentBuildings.filter((el:any)=>{
  return el.staffCount>staff
})
return filterBuildings
}