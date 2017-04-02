  var config = {
    apiKey: "AIzaSyCrAFKC95xCF2GvHBZoBV7fwYzzHts4NEA",
    authDomain: "meditrack-6a333.firebaseapp.com",
    databaseURL: "https://meditrack-6a333.firebaseio.com",
    projectId: "meditrack-6a333",
    storageBucket: "meditrack-6a333.appspot.com",
    messagingSenderId: "147072280269"
  };
  firebase.initializeApp(config);



var userRef = firebase.database().ref().child("Users");
var aNumber;




function clicked(){

aNumber = $("#aadharNumber").val();
var pin = $("#pinNumber").val();

if(aNumber != "" && pin != ""){
  var email = aNumber + "@prototype.in";
  firebase.auth().signInWithEmailAndPassword(email, pin).then(function() {
  // Sign-out successful.
  
  location.href = "../html/pat_index.html";
}).catch(function(error) {
  // Handle Errors here.

  window.alert(error.message);
}

);

}

window.alert('logged in');

}

function registerPage(){

  location.href = "../pat_html/register.html";
}


function loginPage(){
    location.href = "../html/pat_index.html";
}

function register(){
  var email = $("#id").val();
  var pass = $("#pass").val();
  var pass2 = $("#pass2").val();
  var emailF = email + "@prototype.in";
  if(email != "" && pass != "" && pass2 != ""){
    if(pass==pass2){
        firebase.auth().createUserWithEmailAndPassword(emailF, pass).then(function() {
  if(firebase.auth().currentUser){
                  var database1= firebase.database().ref().child("Users").child(email);
                  database1.child("Latest Prescription").set("Prescribed Latest");
                  database1.child("Total Prescription").set("Previously Prescribed");
                  database1.child("Emergency").child("Contacts").set("contact");
                  database1.child("Emergency").child("Emergency History").set("No History");
                  database1.child("Has Pin").set("True");
                  database1.child("info").set({
                        username: "name",
                        Phone: "Phone",
                        Address: "Address",
                        Image : "Image",
                        DOB: "DOB",
                        SecureKey: pass,});
                   database1.child("Location").set({
                        Latitude: "Lat",
                        Longitude: "Long",
                      });}
                   
                       
                location.href = "../index.html";
              }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ...
                      });
        window.alert('registerd');
        }
    }
  }

