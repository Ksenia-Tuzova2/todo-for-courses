export const sentense='hello friends'

export function splitInToWords(sentense:string){
return sentense.split(' ').map(w=>w.replace('!',''))
}

export function mult(a:number,b:number){
  return a*b

  }

  export  function sum(a:number,b:number){
    return a+b
    }