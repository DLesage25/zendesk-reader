import { combineReducers } from 'redux';
import entryEmail from './entryEmail';
import startupData from './startup_data';

const rootReducer = combineReducers({
	entryEmail: entryEmail,
	startupData: startupData
});

export default rootReducer;

