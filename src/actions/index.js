import dataTypes from '../components/dataTypes';
import FB from 'firebase';

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
    err.isInvalidPath(arguments,'path',path);
    let res = await DB.ref('/' + path).once('value');
    if(res) res = res.val();
    return res;
};

function write(path,data){
    err.isInvalidPath(arguments,'path',path);
    err.isInvalidWriteData(arguments,'data',data);
    DB.ref('/' + path).set(data);
    return true;
};

function remove(path){
    err.isInvalidPath(arguments,'path',path);
    DB.ref('/' + path).remove();
    return true;
};

function unwatch(path){
    err.isInvalidPath(arguments,'path',path);
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

export function fetchAndInitialize(email){
    return async dispatch => {
        const userID = email2id(email);
        let [
            userData,
            //settings,
            productionData
        ] = await Promise.all([
            get('users/current/byUserID/' + userID),
            //get('settings/byUser/' + userID),
            //get(program + '/production')
        ]);

        // if(!userSettings){
        //     const newSett = newSettings();
        //     userSettings = newSett;
        //     postSettings2(userID,newSett);
        // }

        const prettyObject = {
            user : {
                ...userData
                //userSettings         : userSettings,
            },
            productionData          : productionData
        };
        return dispatch({ type: FETCH_USER_DATA, payload: prettyObject });
    }
};

// export async function fetchInsight(userID){
//     err.isFalsy(arguments,'userID',userID);
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