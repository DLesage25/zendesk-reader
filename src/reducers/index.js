import { combineReducers } from 'redux';
import entryData from './entry_data';

const rootReducer = combineReducers({
	entryData: entryData
});

export default rootReducer;
