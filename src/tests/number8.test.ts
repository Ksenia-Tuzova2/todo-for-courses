import { hairDresser, moveUser } from "./number8"

test('hairdresser test',()=>{
  let userHair=32
 
  expect( hairDresser(userHair,2)).toBe(16)
})


test('change adress',()=>{
  let user={
    name:'Ksu',
    phone:89967817784,
    adress:{
      nameOfCity:'Moscow'
    },
    gadgets:{
      phone:'Samsung',
      laptop:'Acer'
    }
  }
 

  // let movedUser=moveUser(user,'Peterburg')

  let movedUser={...user}

  expect(movedUser).not.toBe(user)
  // expect(movedUser.adress).not.toBe(user.adress)


  // expect(movedUser.adress.nameOfCity).toBe('Peterburg')
  // expect(movedUser.gadgets).toBe(user.gadgets)
})