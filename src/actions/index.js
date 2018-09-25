import Types from './types'
import dataTypes from '../components/dataTypes';
import FB from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import rest from 'restler';
import moment from 'moment-timezone';
import _ from 'lodash';

import newSettings from '../modules/newSettings';

import formatTeamLinegraphData from '../modules/charts/linegraph/formatTeamData';
import formatIndividualLinegraphData from '../modules/charts/linegraph/formatIndividualData';
import formatQueueData from '../modules/charts/linegraph/formatQueueData';
import formatTagData from '../modules/charts/radargraph/formatTagData';

import tempBambooData from './tempBambooData';

const {
    FETCH_ALL_DATA,
    SET_ENTRY,
    GRAPH_DATA,
    FILTER_INDIVIDUAL_PRODUCTIVITY,
    FETCH_PROGRAM,
    DRILLDOWN_MODAL_DATA
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

export function postProgramSettings(program, programSettings) {
    write('/programs/' + program, programSettings);
}

//the getprogram function should pull all users from /users in FB and filter using that
export async function getProgramRoster(programId) {
    let users = await get('/users/byUserId');
    let userTree = {};

    _.filter(users, function(o) { return o.program.toLowerCase() === programId.replace('_', ' ') }).map((user) => {
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

export function getDrilldownModalData(type, productivityData, callback) {
    return async dispatch => {
        console.log(type, {productivityData});
        let defaultUserObject = {
            hour: '',
            name: '',
            publicComments: 0,
            goal: 0,
            goalType: '',
            solved: 0,
            pending: 0,
            open: 0
        }

        let defaultTagObject = {
            hour: ''
        }

        let payload = [];

        let isEmail = type.split('@').length > 1;

        if (type === 'teamProductivity') {

            let teamArray = Object.values(Object.values(productivityData)[Object.values(productivityData).length - 1].byHour);

            let teamArrayKeys = Object.keys(Object.values(productivityData)[Object.values(productivityData).length - 1].byHour);

            _.forEach(teamArray, (entry, key) => {


                let teamByHour = Object.values(entry);

                let newUserObject = JSON.parse(JSON.stringify(defaultUserObject));

                newUserObject.hour = teamArrayKeys[key];

                newUserObject.goalType += teamByHour[0].goalType;

                newUserObject.name = 'All Users';

                teamByHour.map(teamMember => {
                    if (teamMember.privateComments !== undefined) {
                        newUserObject.publicComments += teamMember.privateComments;
                        newUserObject.goal += parseInt(teamMember.goal);
                        newUserObject.solved += teamMember.solved;
                        newUserObject.pending += teamMember.pending;
                        newUserObject.open += teamMember.open;
                    }
                })

                payload.push(newUserObject);

                if(key === teamArray.length - 1) {
                    console.log('team', payload)
                    if(callback) callback();
                    return dispatch({ type: DRILLDOWN_MODAL_DATA, payload: payload })
                }
            })
        } else if (isEmail) {
            let teamArray = Object.values(Object.values(productivityData)[Object.values(productivityData).length - 1].byHour);

            let teamArrayKeys = Object.keys(Object.values(productivityData)[Object.values(productivityData).length - 1].byHour);

            let email = type;
            let nameChunks = email.split('@')[0].split('.');
            let newNameChunks = [];
            let name;

            _.forEach(nameChunks, (chunk, chunkKey) => {
                chunk = chunk.charAt(0).toUpperCase() + chunk.slice(1);
                newNameChunks.push(chunk);

                if(chunkKey === nameChunks.length - 1) {
                    name = newNameChunks.join(' ');

                    _.forEach(teamArray, (entry, key) => { 

                        let teamByHour = Object.values(entry);

                        let newUserObject = JSON.parse(JSON.stringify(defaultUserObject));

                        newUserObject.hour = teamArrayKeys[key];

                        teamByHour.map(teamMember => { 
                            if(teamMember.email === email) {
                                newUserObject.name = name;
                                newUserObject.publicComments = teamMember.privateComments;
                                newUserObject.goal = teamMember.goal;
                                newUserObject.goalType = teamMember.goalType;
                                newUserObject.solved = teamMember.solved;
                                newUserObject.pending = teamMember.pending;
                                newUserObject.open = teamMember.open;
                            }
                        })

                        payload.push(newUserObject);

                        if(key === teamArray.length - 1) {
                            console.log('individual', payload)
                            if(callback) callback();
                            return dispatch({ type: DRILLDOWN_MODAL_DATA, payload: payload })
                        }
                    
                    })

                }
            })
            } else if (type === 'queueData') {

                let tagsArray = productivityData[productivityData.length - 1].datasets;
                let timeKeys = productivityData[productivityData.length - 1].labels;

                _.forEach(timeKeys, (time, timeKey) => {

                    let newTagObject = JSON.parse(JSON.stringify(defaultTagObject));
                    
                    newTagObject.hour = time;

                    tagsArray.map(tag => {
                        newTagObject[tag.label] = tag.data[timeKey] ? tag.data[timeKey] : 0;
                    })

                    payload.push(newTagObject);


                    if(timeKey === timeKeys.length - 1) {
                        console.log('tags', payload)
                        if(callback) callback();
                        return dispatch({ type: DRILLDOWN_MODAL_DATA, payload: payload })
                    }

                })

                console.log('tagsArray', tagsArray, 'timeKeys', timeKeys)
            }
    }
}

export function getLinegraphData(globalProgram, productivityData) {
    return async dispatch => {
        let [
            teamGraphData,
            individualGraphData,
            queueData,
            tagData
        ] = await Promise.all([
            formatTeamLinegraphData.formatChartData(globalProgram, productivityData),
            formatIndividualLinegraphData.formatChartData(globalProgram, productivityData),
            formatQueueData.formatChartData(globalProgram, productivityData),
            formatTagData.formatChartData(globalProgram, productivityData)
        ]);

        let payload = {
            teamGraphData,
            individualGraphData,
            queueData,
            tagData
        }

        return dispatch({ type: GRAPH_DATA, payload: payload });
    }
}

export function programToId(program) {
    switch (program) {
        case 'Operations':
        case 'Khan Academy':
            return 'khan'
            break;
        default:
            return program.replace(' ', '_').toLowerCase();
    }
}

export function fetchAndInitialize(email) {
    return async dispatch => {
        //email = 'bradley.mccalla@partnerhero.com' //test with this
        const userID = email2id(email);
        const date = moment();

        let [
            userData,
            allProgramSettings
        ] = await Promise.all([
            get('users/byUserId/' + userID),
            get('programs/')
        ])

        let programId = programToId(userData.program);
        let selectedProgram = _.find(allProgramSettings, (o) => { return o.settings.id === programId })
        let productivityData = await get('productivity/byProgram/' + programId +
            '/byYear/' + date.year() +
            '/byWeek/' + date.week())

        if (!selectedProgram && productivityData) {
            const team = await getProgramRoster(programId);
            const settings = newSettings.program(programId);

            selectedProgram = {
                settings: settings,
                team: team
            }

            allProgramSettings[programId] = selectedProgram;

            postProgramSettings(programId, selectedProgram);
        }

        let programList = _.map(allProgramSettings, (o) => {
            return {
                prettyName: o.settings.prettyName,
                id: o.settings.id
            }
        })

        const payload = {
            globalDate: date.format('MM_DD_YY'),
            globalProgram: selectedProgram,
            userData: userData,
            productivityData: productivityData ? productivityData.byDate : null, //fix this, /byDate should not exist as a branch
            appSettings: {
                programList: programList
            }
        }
        return dispatch({ type: FETCH_ALL_DATA, payload: payload });
    }
}

export function fetchProgram(programName, appData, isRefresh, callback, date) {
    return async dispatch => {
        let allProgramSettings = await get('programs/');

        let selectedProgram = _.find(allProgramSettings, (o) => { return o.settings.prettyName === programName })
        let programId = selectedProgram.settings.id;
        let dateObject = date || moment();

        let productivityData = await get('productivity/byProgram/' + programId +
            '/byYear/' + dateObject.year() +
            '/byWeek/' + dateObject.week());

        let productivityDataByDate = productivityData ? productivityData.byDate : null;

        const payload = {
            appSettings: appData.appSettings,
            globalDate: dateObject.format('MM_DD_YY'),
            globalProgram: selectedProgram,
            productivityData: productivityDataByDate,
            isRefresh: isRefresh
        };
        if(callback) callback();
        return dispatch({ type: FETCH_PROGRAM, payload: payload });
    }
}