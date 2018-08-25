let firebase = require('firebase');


// firebase.initializeApp({
//   apiKey: "AIza....",                             // Auth / General Use
//   authDomain: "YOUR_APP.firebaseapp.com",         // Auth with popup/redirect
//   databaseURL: "https://YOUR_APP.firebaseio.com", // Realtime Database
//   storageBucket: "YOUR_APP.appspot.com",          // Storage
//   messagingSenderId: "123456789"                  // Cloud Messaging
// });

//----------------------------------------------------------
//setting our configuration object with our Firebase credentials
var config = {
    apiKey: "AIzaSyA_7XYTtYjyMedZ8_TZhspDlOERSBKc4pE",
    authDomain: "zendeskreader.firebaseapp.com",
    databaseURL: "https://zendeskreader.firebaseio.com",
    projectId: "zendeskreader",
    storageBucket: "zendeskreader.appspot.com",
    messagingSenderId: "45174707150"
};

//initializing our Firebase DB that will use our credentials used when signing in to the UI
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
//setting a variable that will contain our DB access
var database = firebase.database();

var fireBaseDAO = {};

fireBaseDAO.authenticate = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword('daniel@partnerhero.com', 'PartnerHero').then(() => {
            resolve(true)
        }).catch((error) => {
           // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  if (errorCode === 'auth/wrong-password') {
		    alert('Wrong password.');
		  } else {
		    alert(errorMessage);
		  }
		  console.log(error);
        });
    })
}

fireBaseDAO.read = (reference) => {
    return new Promise((resolve, reject) => {
        fireBaseDAO.authenticate().then((access) => {
        	console.log(access)
            reference = reference || '' //read from root
            //create reference path
            let databaseReference = database.ref(reference + '/');
            //query DB
            console.log("Reading " + reference + "'/'...")
            databaseReference.on('value', (snapshot) => {
                resolve(snapshot.val());
            }, (errorObject) => {
                reject(errorObject);
            });

        })
    })
}

fireBaseDAO.database = database;

module.exports = fireBaseDAO;