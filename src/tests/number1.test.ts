import { forEachChild } from "typescript";
import { mult, splitInToWords, sum } from "./number1";



let a:number;
let b:number;
let c:number;

//эта функция после замыкания - присваивания значений в тестах, а именно мы их перезатираем, она заменяет назначенные значения на новые
beforeEach(()=>{
a=1;
b=2;
c=3;
})


 test('sum should be corrected',()=>{

  //data
  const a=10;
  const b=20;
  const c=30;
  //action 
  const result=sum(a,b)
  const result1=sum(c,b)
  //expect result
 expect(result).toBe(30)
 expect(result1).toBe(50)
})

test('sum should be corrected2',()=>{

  //data- берем их из бифор ич


  //action 
  const result=sum(a,b)
  const result1=sum(c,b)
  
  //expect result
 expect(result).toBe(3)
 expect(result1).toBe(5)
})

test('mult should be corrected',()=>{

  //data
  const a=1;
  const b=2;
  const c=3;
  //action 
  const result=mult(a,b)
  const result1=mult(c,b)
  //expect result
 expect(result).toBe(2)
 expect(result1).toBe(6)
})


test('split should be corrected',()=>{

  //data
  const a='hello friends and u';

  //action 
  const result=splitInToWords(a)
 
  //expect result
 expect(result[0]).toBe('hello')
 expect(result[1]).toBe('friends')
 expect(result[2]).toBe('and')
})


export default test