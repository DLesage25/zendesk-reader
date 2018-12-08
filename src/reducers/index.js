import { combineReducers } from 'redux';
import entryEmail from './entryEmail';
import startupData from './startupData';
import graphData from './graphData';
import filterIndividualProductivity from './filterIndividualProductivity';
import fetchProgram from './fetchProgram';

const rootReducer = combineReducers({
	entryEmail: entryEmail,
	startupData: startupData,
	graphData: graphData,
	filteredIndividualProductivity: filterIndividualProductivity,
	fetchProgram: fetchProgram
});

export default rootReducer;

