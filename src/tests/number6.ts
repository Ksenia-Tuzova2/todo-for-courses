import { CartType } from "./number6.test";

export function countAllPurchace(cart:Array<CartType>){
  let map=cart.map((el:any)=>{return el.price})
  let newPrice=map.reduce((sum:number,current:number)=>{
return sum+current
  },0)
return newPrice
}