// 01. создайте в том же файле ещё одну функцию, чтобы тесты прошли

import { CityType } from "./number2";
import { getStreetsTitlesOfGovernmentBuildings, getStreetsTitlesOfHouses } from "./number5";

export let city:any={
 
    governmentBuildings:[
      {name:"Central Str"},
      {name:"South Str"},
    ],
  
houses:[
  {name:"White street"},
  {name:"Happy street"},
  {name:"Happy street"},
]
  }

test('list of streets titles of government buildings', ()=> {
    let streetsNames = getStreetsTitlesOfGovernmentBuildings(city.governmentBuildings);

    expect(streetsNames.length).toBe(2);
    expect(streetsNames[0]).toBe("Central Str");
    expect(streetsNames[1]).toBe("South Str");
})

//02. создайте в том же файле ещё одну функцию, чтобы тесты прошли
test('list of streets titles', ()=> {
    let streetsNames = getStreetsTitlesOfHouses(city.houses);

    expect(streetsNames.length).toBe(3);
    expect(streetsNames[0]).toBe("White street");
    expect(streetsNames[1]).toBe("Happy street");
    expect(streetsNames[2]).toBe("Happy street");
})