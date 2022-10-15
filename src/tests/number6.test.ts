import { v1 } from 'uuid';
import { countAllPurchace } from './number6';
//reduce taste
export type CartType = {

  id: string,
  name: string,
  price: number,

}

let cart: Array<CartType>

beforeEach(() => {
  cart = [
    {
      id: v1(),
      name: 'shampoo',
      price: 120,
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

  ]

})
// 01. Тесты должны пройти
test('All things in cart should be counted ', () => {
  expect(countAllPurchace(cart)).toBe(1020);
});
