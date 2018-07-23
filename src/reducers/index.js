import { combineReducers } from 'redux';
import entryEmail from './entryEmail';
import startupData from './startupData';
import graphData from './graphData';
import filterIndividualProductivity from './filterIndividualProductivity';
import globalDate from './globalDate';

const rootReducer = combineReducers({
	entryEmail: entryEmail,
	startupData: startupData,
	graphData: graphData,
	filteredIndividualProductivity: filterIndividualProductivity,
	globalDate: globalDate
});

export default rootReducer;

