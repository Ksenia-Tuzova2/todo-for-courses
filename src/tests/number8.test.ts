import { v1 } from "uuid"
import { addCompany, hairDresser, moveUser, updateCompany, upgradeLaptop } from "./number8"

test('hairdresser test',()=>{
  let userHair=32
 
  expect( hairDresser(userHair,2)).toBe(16)
})


test('upgrade laptope to macbook',()=>{
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
 

  let upgradeUser=upgradeLaptop(user,'Macbook')

  // let movedUser={...user}

  expect(upgradeUser).not.toBe(user)
  expect(upgradeUser.gadgets).not.toBe(user.gadgets)


  expect(upgradeUser.gadgets.laptop).toBe('Macbook')
  expect(upgradeUser.adress).toBe(user.adress)
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
 

  let movedUser=moveUser(user,'Peterburg')

  // let movedUser={...user}

  expect(movedUser).not.toBe(user)
  expect(movedUser.adress).not.toBe(user.adress)


  expect(movedUser.adress.nameOfCity).toBe('Peterburg')
  expect(movedUser.gadgets).toBe(user.gadgets)
})

test('add company',()=>{
  let user={
    name:'Ksu',
    phone:89967817784,
    adress:{
      nameOfCity:'Moscow'
    },
    gadgets:{
      phone:'Samsung',
      laptop:'Acer'
    },
    company:[{id:v1(),name:'Epam'},{id:v1(),name:'Google'},],
  }
 

  let addCompanyUser=addCompany(user,'ITPeterburg')

  // let movedUser={...user}

  expect( addCompanyUser).not.toBe(user)
  expect( addCompanyUser.company).not.toBe(user.company)


  expect( addCompanyUser.company[2].name).toBe('ITPeterburg')
  expect( addCompanyUser.gadgets).toBe(user.gadgets)
})


test('change company',()=>{
  let user={
    name:'Ksu',
    phone:89967817784,
    adress:{
      nameOfCity:'Moscow'
    },
    gadgets:{
      phone:'Samsung',
      laptop:'Acer'
    },
    company:[{id:v1(),name:'Epam'},{id:v1(),name:'Google'},],
  }
 

  let updatedCompanyUser=updateCompany(user, user.company[1].id,'ITPeterburg')

  // let movedUser={...user}

  expect( updatedCompanyUser).not.toBe(user)
  expect( updatedCompanyUser.company).not.toBe(user.company)


  expect( updatedCompanyUser.company[1].name).toBe('ITPeterburg')
  expect( updatedCompanyUser.gadgets).toBe(user.gadgets)
})