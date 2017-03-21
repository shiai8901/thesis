export const ACTION_ONE_1 = 'ACTION_ONE_1';
export const ACTION_ONE_2 = 'ACTION_ONE_2';
export const ACTION_TWO_1 = 'ACTION_TWO_1';
export const ACTION_TWO_2 = 'ACTION_TWO_2';

export const HIDE_QUESTION_FORM = 'HIDE_QUESTION_FORM';


//1. create action function to dispatch an action
export function hideQuestionForm() {
  console.log('inside hideQuestionForm');
  return {
    type: HIDE_QUESTION_FORM,
  }
}



//Redux examples
export function actionOneIncrease() {
  console.log('inside actionOneINcrease');
  return {
    type: ACTION_ONE_1,
  }
}

export function actionOneDecrease() {
  return {
    type: ACTION_ONE_2,
  }
}

export function actionTwoIncrease() {
  return {
    type: ACTION_TWO_1,
  }
}

export function actionTwoDecrease() {
  return {
    type: ACTION_TWO_2,
  }
}
