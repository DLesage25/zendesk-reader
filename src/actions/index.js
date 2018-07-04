import Types from './types'
// import objects from '../modules/objects';
import dataTypes from '../components/dataTypes';
import FB from 'firebase';
import rest from 'restler';

import formatTeamLinegraphData from '../modules/charts/linegraph/formatTeamData';
import formatIndividualLinegraphData from '../modules/charts/linegraph/formatIndividualData';

const {
    FETCH_ALL_DATA,
    SET_ENTRY,
    GRAPH_DATA
} = Types;

let AccessData = {
    apiKey: "AIzaSyA_7XYTtYjyMedZ8_TZhspDlOERSBKc4pE",
    authDomain: "zendeskreader.firebaseapp.com",
    databaseURL: "https://zendeskreader.firebaseio.com",
    projectId: "zendeskreader",
    storageBucket: "zendeskreader.appspot.com",
    messagingSenderId: "45174707150"
};
FB.initializeApp(AccessData);
const DB     = FB.database();

async function get(path){
    let res = await DB.ref('/' + path).once('value');
    if(res) res = res.val();
    return res;
};

function write(path,data){
    DB.ref('/' + path).set(data);
    return true;
};

function remove(path){
    DB.ref('/' + path).remove();
    return true;
};

function unwatch(path){
    DB.ref('/' + path).off();
    return true;
};

export function email2id   ( email ) { return email.substring(0,email.indexOf('@')).replace(/\./g,'_'); };

var provider = new FB.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'hd': 'partnerhero.com' });

export async function login(){
    if(localStorage.getItem('running')===null){
        try{
            localStorage.setItem('running',true);
            FB.auth().signInWithRedirect(provider);
            return dispatch => { return dispatch({ type: 'NOTHING', payload: '' });  };
        } catch (error){
            const { errorCode, errorMessage, email, credential } = error;
            console.error(error);
        }
    } else {
        try{
            localStorage.removeItem('running');
            const data = await FB.auth().getRedirectResult();
            const user = { 
                ...data.additionalUserInfo.profile, 
                ...data.credential
            };
            let accessData = user.email;

            return dispatch => { return dispatch({ type: SET_ENTRY, payload: accessData });  };
        } catch(error){
            console.error(error);
            localStorage.removeItem('running');
            return dispatch => { return dispatch({ type: SET_ENTRY, payload: '' });  };
        }
    }
};

export function fetchUserData(email){
    return dispatch => {
        DB.ref('/users').once('value', snapshot => {
            dispatch({ type: FETCH_USER_DATA, payload: [snapshot.val(),email] });
    });};
};

// export function fetchAndInitialize(email){
//     return async dispatch => {
//         const userID = email2id(email);
//         let userData = await get('users/byUserId/' + userID);
//         console.log(userData);
//         let productionData = await get(userData.program + '/productivity');
//         // if(!userData.userSettings){
//         //     const newUser = newSettings();
//         //     userSettings = newSett;
//         //     postSettings2(userID,newSett);
//         // }
//         const payload = {
//             userData : {
//                 ...userData
//                 //userSettings         : userSettings,
//             },
//             productionData          : productionData
//         };

//         return dispatch({ type: FETCH_ALL_DATA, payload: payload });
//     }
// };

// async function getIndividualLineGraphData(programData) {
    
// }

export function getLinegraphData(programData) {
    return async dispatch => {
        // let teamGraphData = await formatTeamLinegraphData.formatChartData(programData);
        // let individualGraphData = await formatIndividualLinegraphData.formatChartData(programData);
        let [
            teamGraphData,
            individualGraphData
        ] = await Promise.all([
            formatTeamLinegraphData.formatChartData(programData),
            formatIndividualLinegraphData.formatChartData(programData)
        ]);

        let payload = {
            teamGraphData,
            individualGraphData
        }

        return dispatch({ type: GRAPH_DATA, payload: payload });
    }
}

export function fetchAndInitialize(email){
    return async dispatch => {
        const userID = email2id(email);
        console.log(userID);
        let [
            userData,
            //settings,
            programData
        ] = await Promise.all([
            get('users/byUserId/' + userID),
            get('khan/')
            //get(program + '/production')
        ]);

        // if(!userSettings){
        //     const newSett = newSettings();
        //     userSettings = newSett;
        //     postSettings2(userID,newSett);
        // }

        const prettyObject = {
            userData : {
                ...userData
                //userSettings         : userSettings,
            },
            programData          : programData
        };

        console.log('prettyobject', prettyObject)
        return dispatch({ type: FETCH_ALL_DATA, payload: prettyObject });
    }
};

// function createNewUser() {
//     return new Promise(resolve => {

//     })
// }

// export async function fetchInsight(userID){
//     const [
//         received,
//         authored
//     ] = await Promise.all([
//         get('peerinsights/current/responses/byUser/' + userID),
//         get('peerinsights/current/responses/byAuthor/' + userID)
//     ]);
//     return dispatch => {
//         dispatch({ 
//             type    : FETCH_TARGET_INSIGHTS,
//             payload : {
//                 received : received,
//                 made     : authored
//             }
//         });
//     };
// };