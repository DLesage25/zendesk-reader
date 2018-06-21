let firebase = require('firebase');


// firebase.initializeApp({
//   apiKey: "AIza....",                             // Auth / General Use
//   authDomain: "YOUR_APP.firebaseapp.com",         // Auth with popup/redirect
//   databaseURL: "https://YOUR_APP.firebaseio.com", // Realtime Database
//   storageBucket: "YOUR_APP.appspot.com",          // Storage
//   messagingSenderId: "123456789"                  // Cloud Messaging
// });



module.exports = () => {

	  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyA_7XYTtYjyMedZ8_TZhspDlOERSBKc4pE",
	    authDomain: "zendeskreader.firebaseapp.com",
	    databaseURL: "https://zendeskreader.firebaseio.com",
	    projectId: "zendeskreader",
	    storageBucket: "zendeskreader.appspot.com",
	    messagingSenderId: "45174707150"
	  };
	  firebase.initializeApp(config);

	firebase.auth().signInWithEmailAndPassword('daniel@partnerhero.com', 'PartnerHero')
		.then(function() {
			console.log('ok')
		})
	    .catch(function(error) {
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

}