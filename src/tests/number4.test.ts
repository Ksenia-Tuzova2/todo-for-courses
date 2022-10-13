import { demolishHousesOnTheStreet, getBuildingsWithStaffCountGreaterThen } from "./number4";

//  01. Дополните тип HouseType (добавьте порядковый id от 1 и по возрастанию)

type HousesType = {
  name: String,
  repaired: Boolean,
  id: number,
}

type CityType = {

  governmentBuildings: Array<{
    id:number,
    type: String,
    buget: Number,
    staffCount: Number,
    adress: {
      street: {
        title: String
      }
    }
  }>,
  cityzensNumber: Number,

  houses: Array<HousesType>
}
let newCity: CityType


beforeEach(() => {
  newCity = {

    governmentBuildings: [
      {
        id:1,
        type: "HOSPITAL",
        buget: 200000,
        staffCount: 200,
        adress: {
          street: {
            title: 'Central Str'
          }
        }
      },
      {
        id:2,
        type: "FIRE-STATION",
        buget: 500000,
        staffCount: 1000,
        adress: {
          street: {
            title: 'South Str'
          }
        }
      },

    ],
    cityzensNumber: 1000000,

    houses: [
      {
        id:1,
          name: "White street",
        repaired: true
      },
      {

        id:2,
        name: "Happy street",
        repaired: true
      },
      {

        id:3,
        name: "Happy street",
        repaired: true
      },
    ]
  }
})
// 02. Создайте в том же файле ещё одну функцию, чтобы тесты прошли
test('House should be destroyed', () => {
  demolishHousesOnTheStreet(newCity, 'Happy street');

  expect(newCity.houses.length).toBe(1);
  expect(newCity.houses[0].id).toBe(1);

})

// 03. Массив строений, где работают больше 500 людей
test('buildings with correct staff count', () => {
  let buildings = getBuildingsWithStaffCountGreaterThen(newCity.governmentBuildings, 500)

  expect(buildings.length).toBe(1);
  expect(buildings[0].type).toBe('FIRE-STATION')
})
