import { CityType } from './number2';


export let city:CityType={
houses:[
  {
    buildAt:2021,
    floors:21,
    yard: true,
  },
]
}

let cityzens:number
 

//можно написать скип, если хотим пропустить конкретный скип
  test.skip('test house type1',()=>{

  //data be brought in global files
  //action
  //expected
  expect(city.houses[0].buildAt).toBe(2021)
  expect(city.houses[0].floors).toBe(21)
  expect(city.houses[0].yard).toBe(true)
  })

  test('test house type',()=>{

    //data be brought in global files
    //action
    //expected
    expect(city.houses[0].buildAt).toBe(2021)
    expect(city.houses[0].floors).toBe(21)
    expect(city.houses[0].yard).toBe(true)
    })

    