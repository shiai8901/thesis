import { HIDE_QUESTION_FORM } from '../actions/index' //import actions

export default function hideQuestionForm(state = {
        showForm: true,
        showButton: false
      }, action) {
  const current = state;
  switch (action.type) {
    case HIDE_QUESTION_FORM:
      return {
        showForm: false,
        showButton: true
      };
    default:
      return state;
  }
}