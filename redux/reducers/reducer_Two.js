import { ACTION_TWO_1, ACTION_TWO_2 } from '../actions/index' //import actions

export default function reducer_One(state = 0, action) {
  const current = state;
  switch (action.type) {
    case ACTION_TWO_1:
      return current + 1;
    case ACTION_TWO_2:
      return current - 1;
    default:
      return state;
  }
}