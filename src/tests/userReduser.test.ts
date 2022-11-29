import { userReduser } from "../store/userReduser";

test('user reduser should increment age for user',()=>{
const startState={
  age:20,
  children:2,
  name:'Ksusha'
}

const endState=userReduser(startState,{type:'INCREMENT-AGE'})

expect(endState.age).toBe(21)
expect(endState.children).toBe(2)

})

test('user reduser should increment children for user',()=>{
  const startState={
    age:20,
    children:0,
    name:'Ksusha'
  }
  
  const endState=userReduser(startState,{type:'INCREMENT-CHILDREN-COUNT'})
  
  expect(endState.age).toBe(20)
  expect(endState.children).toBe(1)

  
  })

  test('user reduser should change name for user',()=>{
    const startState={
      age:20,
      children:0,
      name:'Ksusha'
    }
    
    const endState=userReduser(startState,{type:'CHANGE-NAME'})
    
    expect(endState.name).toBe('Ksenia')

    
    })