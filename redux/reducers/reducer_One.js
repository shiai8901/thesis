import { ACTION_ONE_1, ACTION_ONE_2 } from '../actions/index' //import actions

export default function reducer_One(state = 0, action) {
  const current = state;
  switch (action.type) {
    case ACTION_ONE_1:
      return current + 1;
    case ACTION_ONE_2:
      return current - 1;
    default:
      return state;
  }
}