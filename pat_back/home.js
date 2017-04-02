  var config = {
    apiKey: "AIzaSyCrAFKC95xCF2GvHBZoBV7fwYzzHts4NEA",
    authDomain: "meditrack-6a333.firebaseapp.com",
    databaseURL: "https://meditrack-6a333.firebaseio.com",
    projectId: "meditrack-6a333",
    storageBucket: "meditrack-6a333.appspot.com",
    messagingSenderId: "147072280269"
  };
  firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var email = user.email;
    //window.alert(email);
    var aNumber = email.replace("@prototype.in", "");
    //window.alert(email);
    var rootref = firebase.database().ref().child("Users").child(aNumber).child("Latest Prescription").child("Date");
              rootref.on('value', function(snaggle){
                var dDate = snaggle.val();
                $("#HosBody").append("<tr><td>Date:- " + dDate + "</td></tr>");
              });

              var rootref = firebase.database().ref().child("Users").child(aNumber).child("Latest Prescription").child("Diagnosis");
              rootref.on('value', function(snaggle){
                var dDate = snaggle.val();
                $("#HosBody").append("<tr><td>Diagnosis:- " + dDate + "</td></tr>");
              });

              var rootref = firebase.database().ref().child("Users").child(aNumber).child("Latest Prescription").child("Doctor Name");
              rootref.on('value', function(snaggle){
                var dDate = snaggle.val();
                $("#HosBody").append("<tr><td>Doctor:- " + dDate + "</td></tr>");
              });

              var rootref = firebase.database().ref().child("Users").child(aNumber).child("Latest Prescription").child("Hospital Name");
              rootref.on('value', function(snaggle){
                var dDate = snaggle.val();
                $("#HosBody").append("<tr><td>Hospital:- " + dDate + "</td></tr>");
              });

              // DISPLAYING MEDICINES

              var rootref = firebase.database().ref().child("Users").child(aNumber).child("Latest Prescription").child("Medcines");
              rootref.on("child_added", snap => {
                  var MedName = snap.child("Medicine Name").val();
                  var MedDosage = snap.child("Dosage").val();
                  var MedTiming = snap.child("Timing").val();
                  $("#MedBody").append("<tr><td>" + MedName + "</td><td>" + MedDosage + "</td><td>" + MedTiming + "</td></tr>");
              });
    
  } else {
    window.alert('not in');
    // No user is signed in.
  }
});

function emer(){
  window.alert('Emergency Initiated');
}




function logout(){
  window.alert('clicked');
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  //prev it waS LIKE ../index.html now i am redirecting him to main homepage when he signout
  location.href = "../index.html";
}).catch(function(error) {
  // An error happened.
  window.alert(error.message);
});

}



