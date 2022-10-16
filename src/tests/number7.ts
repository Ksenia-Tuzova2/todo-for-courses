import { ManType } from './number7.test';


export function onlyName(props:ManType){
  return props.name
}

export function howMuchLessons(props:ManType){
  return props.lesson.length
}

export function pushNewLesson(props:ManType, numberOfLesson:number){
  return  props.lesson.push({title:numberOfLesson})
 
}