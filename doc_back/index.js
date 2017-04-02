window.onload = function() {
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrAFKC95xCF2GvHBZoBV7fwYzzHts4NEA",
    authDomain: "meditrack-6a333.firebaseapp.com",
    databaseURL: "https://meditrack-6a333.firebaseio.com",
    storageBucket: "meditrack-6a333.appspot.com",
    messagingSenderId: "147072280269"
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    location.href = "../doc_html/home.html";
  } else {
    // No user is signed in.
    location.href = "../doc_html/login.html";
  }
});

};