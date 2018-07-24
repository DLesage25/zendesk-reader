import { combineReducers } from 'redux';
import entryEmail from './entryEmail';
import startupData from './startupData';
import graphData from './graphData';
import filterIndividualProductivity from './filterIndividualProductivity';

const rootReducer = combineReducers({
	entryEmail: entryEmail,
	startupData: startupData,
	graphData: graphData,
	filteredIndividualProductivity: filterIndividualProductivity
});

export default rootReducer;

