export type HousesType={

      buildAt:number,
      floors:number,
      yard: boolean,
    
}

export type CityType={
  houses:Array<HousesType>
}