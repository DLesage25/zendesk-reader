import Types from './types'
// import objects from '../modules/objects';
import dataTypes from '../components/dataTypes';
import FB from 'firebase';
import rest from 'restler';
import moment from 'moment-timezone';
import _ from 'lodash';

import newSettings from '../modules/newSettings';

import formatTeamLinegraphData from '../modules/charts/linegraph/formatTeamData';
import formatIndividualLinegraphData from '../modules/charts/linegraph/formatIndividualData';
import formatQueueData from '../modules/charts/linegraph/formatQueueData';

import tempBambooData from './tempBambooData';

const {
    FETCH_ALL_DATA,
    SET_ENTRY,
    GRAPH_DATA,
    FILTER_INDIVIDUAL_PRODUCTIVITY,
    CHANGE_GLOBAL_DATE
} = Types;

let AccessData = {
    apiKey: "AIzaSyA_7XYTtYjyMedZ8_TZhspDlOERSBKc4pE",
    authDomain: "zendeskreader.firebaseapp.com",
    databaseURL: "https://zendeskreader.firebaseio.com",
    projectId: "zendeskreader",
    storageBucket: "zendeskreader.appspot.com",
    messagingSenderId: "45174707150"
};

let BambooOptions = {
    username: 'b2bb8e562b200aa67bfcbbc6b1fce3c9685e7b59',
    password: 'x',
    headers: {
        Accept: 'application/json'
    }
};

FB.initializeApp(AccessData);
const DB = FB.database();

async function get(path) {
    let res = await DB.ref('/' + path).once('value');
    if (res) res = res.val();
    return res;
};

function write(path, data) {
    DB.ref('/' + path).set(data);
    return true;
};

function remove(path) {
    DB.ref('/' + path).remove();
    return true;
};

function unwatch(path) {
    DB.ref('/' + path).off();
    return true;
};

export function email2id(email) { return email.substring(0, email.indexOf('@')).replace(/\./g, '_'); };

var provider = new FB.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'hd': 'partnerhero.com' });

export async function login() {
    if (localStorage.getItem('running') === null) {
        try {
            localStorage.setItem('running', true);
            FB.auth().signInWithRedirect(provider);
            return dispatch => { return dispatch({ type: 'NOTHING', payload: '' }); };
        } catch (error) {
            const { errorCode, errorMessage, email, credential } = error;
            console.error(error);
        }
    } else {
        try {
            localStorage.removeItem('running');
            const data = await FB.auth().getRedirectResult();
            const user = {
                ...data.additionalUserInfo.profile,
                ...data.credential
            };
            let accessData = user.email;

            return dispatch => { return dispatch({ type: SET_ENTRY, payload: accessData }); };
        } catch (error) {
            console.error(error);
            localStorage.removeItem('running');
            return dispatch => { return dispatch({ type: SET_ENTRY, payload: '' }); };
        }
    }
};

// post settings

export function postProgramSettings(program, settings) {
    write(program + '/settings', settings);
}

// export function getProgramBambooId(program) {
//     if()
// }

//the getprogram function should pull all users from /users in FB and filter using that
export async function getProgramRoster(program) {
    let users = await get('/users/byUserId');
    let userTree = {};

    _.filter(users, function(o){ return o.program.toLowerCase() === program }).map((user) => {
        let userID = email2id(user.email);
        userTree[userID] = user;
    })

    return userTree;
}

//leave this for prod, ut fixed o pull from actual bamboo api
export async function syncProgramRoster(programData) {

    //this is not working due to CORS, so using local file
    // rest.get('https://api.bamboohr.com/api/gateway.php/partnerhero/v1/reports/232', BambooOptions).on('complete', (result) => {
    //     console.log(result)
    // })
    // //filter for users without an email and department
    // _.map(result.employees, (index) => {

    // });

    let bambooData = tempBambooData;

    let userTree = {};

    bambooData.map((index) => {
        console.log(index)
        let userId = email2id(index.workEmail)
        userTree[userId] = {
            email: index.workEmail,
            firstName: index.firstName,
            lastName: index.lastName,
            program: index.department
        }
    })

    write('/users/byUserId', userTree);
}

export function fetchUserData(email) {
    return dispatch => {
        DB.ref('/users').once('value', snapshot => {
            dispatch({ type: FETCH_USER_DATA, payload: [snapshot.val(), email] });
        });
    };
};

export function getLinegraphData(programData, productivityData) {
    return async dispatch => {
        let [
            teamGraphData,
            individualGraphData,
            queueData
        ] = await Promise.all([
            formatTeamLinegraphData.formatChartData(programData, productivityData),
            formatIndividualLinegraphData.formatChartData(programData, productivityData),
            formatQueueData.formatChartData(programData, productivityData)
        ]);

        let payload = {
            teamGraphData,
            individualGraphData,
            queueData
        }

        console.log({ queueData })

        return dispatch({ type: GRAPH_DATA, payload: payload });
    }
}

export function fetchAndInitialize(email) {
    return async dispatch => {
        const userID = email2id(email);
        const program = 'grindr'

        const date = moment().format('MM_DD_YY');

        let [
            userData,
            programData,
            productivityData
        ] = await Promise.all([
            get('users/byUserId/' + userID),
            get(program + '/'),
            // get( 'productivity/byProgram/' + program
            //      + '/byYear/' + moment().year()
            //      + '/byWeek/' + moment().week()
            //     )
            get('productivity/byProgram/' + program + '/backup') //delete this, use above after testing
        ]);

        console.log({userData}, {programData})

        //1. I need a way of determining the program(s) a user is in/ has access to

        if (!programData.settings) {
            const team = await getProgramRoster(program);
            const settings = newSettings.program(program);

            settings.team = team;
            programData.settings = settings;

            postProgramSettings(program, settings);
        }

        const prettyObject = {
            userData: userData,
            programData: programData,
            globalDate: date,
            selectedProgram: program,
            productivityData: {byDate: productivityData} //delete inner key after testing
        };

        return dispatch({ type: FETCH_ALL_DATA, payload: prettyObject });
    }
};

export function changeGlobalDate(newDate) {
    return dispatch({ type: CHANGE_GLOBAL_DATE, newDate: newDate });
}

export function filterIndividualProductivity(individualProductivity, globalDate) {
    return async dispatch => {

        let filteredProductivity = individualProductivity.map((userIndex) => {
            userIndex.productivity = _.filter(userIndex.productivity, function(o) { return o.series.Goal.length || o.series.Production.length })

            let dayKeys = userIndex.productivity.map((index) => { return index.dayKey })

            if (dayKeys.indexOf(globalDate) >= 0) {
                return userIndex;
            } else {
                return null;
            }
        })

        filteredProductivity = _.filter(filteredProductivity, function(item) { return item; });

        return dispatch({ type: FILTER_INDIVIDUAL_PRODUCTIVITY, payload: filteredProductivity });
    }
}