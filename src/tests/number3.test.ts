
import { addMoneyToBudget, repairHouse, StudentType, toFireStaff, toHireStaff } from './number3';


type HousesType={
  name:String,
        repaired: Boolean
}

type CityType={

  governmentBuildings: Array<{
    type: String,
    buget: Number,
    staffCount: Number,
    adress: {
      street: {
        title: String
      }
    }
  }>,
    


  cityzensNumber:Number,

  houses: Array<HousesType>
}



let city: CityType

export let student: StudentType


  // student = {
  //   id: 1,
  //   name: 'Ksu',
  //   age: 34,
  //   isActive: true,
  //   adress: {
  //     street: 'Pervomayskaya',
  //     city: {
  //       country: 'Russia',
  //       city: 'Moscow',
  //     }
  //   },
  //   technologies: [
  //     {
  //       id: 1,
  //       name: 'html',
  //     },
  //     {
  //       id: 2,
  //       name: 'css',
  //     },
  //     {
  //       id: 3,
  //       name: 'react',
  //     },
  //     {
  //       id: 4,
  //       name: 'figma',
  //     },
  //   ]
  // }

  beforeEach(()=>{

  
    city = {

      governmentBuildings: [
        {
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
      cityzensNumber:1000000,
    
      houses: [
        {
          name: "White street",
          repaired: true
        },
        {
          name: "Happy street",
          repaired: true
        },
        {
          name: "Happy street",
          repaired: true
        },
      ]
    }
    
  })




// test('student identifity test',()=>{

// })

// 01. Создайте в отдельном файле функцию, чтобы тесты прошли
test('Budget should be for changed fot HOSPITAL', () => {
  addMoneyToBudget(city.governmentBuildings[0], 100000);
  expect(city.governmentBuildings[0].buget).toBe(300000);
});
// 02. Тесты должны пройти
test('Budget should be changed for FIRE-STATION', () => {
  addMoneyToBudget(city.governmentBuildings[1], -100000);
  expect(city.governmentBuildings[1].buget).toBe(400000);
});


// 03. Создайте в том же файле ещё одну функцию, чтобы тесты прошли
test('House should be repaired', () => {
  repairHouse(city.houses[1]);
  expect(city.houses[1].repaired).toBeTruthy();
});


// 04. Создайте в том же файле еще одну функцию, чтобы тесты прошли
test('Staff should be reduced', () => {
  toFireStaff(city.governmentBuildings[0], 20);

  expect(city.governmentBuildings[0].staffCount).toBe(180);
});
// 05. Создайте в том же файле еще одну функцию, чтобы тесты прошли
test('Staff should be increased', () => {
  toHireStaff(city.governmentBuildings[0], 20);

  expect(city.governmentBuildings[0].staffCount).toBe(220);
});