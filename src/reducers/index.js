import { combineReducers } from 'redux';
import entryEmail from './entryEmail';
import startupData from './startupData';
import graphData from './graphData';

const rootReducer = combineReducers({
	entryEmail: entryEmail,
	startupData: startupData,
	graphData: graphData
});

export default rootReducer;

