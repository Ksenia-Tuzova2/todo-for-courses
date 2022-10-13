
export type TechnologiesType={
    id: number,
    name: string,

}


export type AdressType={

    street: string,
    city: {
      country: string,
      city: string,
    }

}


export type StudentType={

    id: number,
    name: string,
    age: number,
    isActive: boolean,
    adress: AdressType
    technologies: Array<TechnologiesType>
  }

  export const addSkill:any=(student:StudentType,newSkill:TechnologiesType)=>{

  }

  export const addMoneyToBudget=(building:any, money:Number)=>{
 building.buget+=money
  }



  export function repairHouse(house:any){
 if(house.repaired===false){
  return house.repaired=true
 } else{return house.repaired }
  }

  export function toFireStaff(building:any, staffCount:number){
   building.staffCount-=staffCount
  }

  export function toHireStaff(building:any, staffCount:number){
    building.staffCount+=staffCount
  }