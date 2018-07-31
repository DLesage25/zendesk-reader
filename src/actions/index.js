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
    FILTER_INDIVIDUAL_PRODUCTIVITY
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

export function postProgramSettings(program, settings, team) {
    write('/programs/' + program + '/settings', settings);
    write('/programs/' + program + '/team', team);
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
    }
}

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

        return dispatch({ type: GRAPH_DATA, payload: payload });
    }
}

//to-do: I need to refine this function to work with Pods too (udemy)
export function fetchUserProgram(program) {
    switch(program) {
        case 'Grindr':
            return 'grindr'
            break;
        case 'Khan Academy':
            return 'khan'
            break;
        default: 
            return 'khan';
            //...add all other cases
    }
}

export function fetchAndInitialize(email) {
    return async dispatch => {
        const userID = email2id(email);

        const date = moment().format('MM_DD_YY');

        let [
            userData,
            allProgramSettings
        ] = await Promise.all([
            get('users/byUserId/' + userID),
            get('programs/')
        ]);

        let program = fetchUserProgram(userData.program);

        let productivityData = await get('productivity/byProgram/' + program
                     + '/byYear/' + moment().year()
                     + '/byWeek/' + moment().week())

        //1. I need a way of determining the program(s) a user is in/ has access to
        // by using fetchUserProgram function on fetchAndInitialize

        //2. I need to make sure the dropdown in productiviy card renders program names capitalized while still keeping track of the 
        // correct option

        let selectedProgram = allProgramSettings[program];

        if (!selectedProgram) {
            const team = await getProgramRoster(program);
            const settings = newSettings.program(program);

            settings.team = team;
            programData.settings = settings;

            postProgramSettings(program, settings, team);

            selectedProgram.settings = settings;
            selectedProgram.team = team;
        }

        let programNames = _.map(allProgramSettings, (o) => { return o.settings.prettyName })

        const payload = {
            programData: selectedProgram,
            userData: userData,
            productivityData: productivityData.byDate, //fix this, /byDate should not exist as a branch
            appSettings: {
                globalDate: date,
                selectedProgram: program,
                programList: programNames
            }
        };

        return dispatch({ type: FETCH_ALL_DATA, payload: payload });
    }
}