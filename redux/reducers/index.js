import {combineReducers} from 'redux';

import reducer_One from './reducer_One';
import reducer_Two from './reducer_Two';

const rootReducer = combineReducers({
  reducer_One,
  reducer_Two,
});

export default rootReducer;