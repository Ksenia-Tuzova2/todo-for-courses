import { v1 } from 'uuid';
//reduce taste
type CartType = {
  
   { id: string,
    name: string,
    price:number, 
   }
  price:number

}

let cart: CartType

beforeEach(() => {
  cart = [
    {
      id: v1(),
      name: 'shampoo',
      price: 100,
    },
    {
      id: v1(),
      name: 'shampoo',
      price: 560,
    },
    {
      id: v1(),
      name: 'shampoo',
      price: 240,
    },
    {
      id: v1(),
      name: 'shampoo',
      price: 100,
    },
    price:0
  ]
})
// 01. Тесты должны пройти
test('All things in cart should be counted ', () => {
  countAllPurchace(cart);
  expect().toBe(400000);
});
