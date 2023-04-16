
export type StateType = {
  age: number,
  children: number,
  name: string
}

type ActionType = {
  type: any,
  [key: string]: any,
}

//но так как редюсер должен быть иммутабельной функцией - не изменять то, что приходит, а делать копию и изменять ее, то мы должны создать копию
export const userReduser = (state: StateType, action: ActionType) => {
  switch (action.type) {

    case ('INCREMENT-AGE'):
      let stateCopy = { ...state }
      stateCopy.age = state.age + 1
      return stateCopy;

    case ('INCREMENT-CHILDREN-COUNT'):
      return { ...state, children: state.children + 1 };

    case ('CHANGE-NAME'):
      return { ...state, name: state.name = 'Ksenia' };
    default: state

  }
}