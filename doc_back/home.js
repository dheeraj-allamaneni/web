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
  
};





function logout(){
  window.alert('clicked');
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  location.href = "../html/doc_index.html";
}).catch(function(error) {
  // An error happened.
  window.alert(error.message);
});

}

function newpresc(){

  location.href = "../doc_html/newPrescription.html";
}

function search(){
 var aNumber = $("#PdharNumber").val();
 if(aNumber != ""){
  var haskid = firebase.database().ref().child("Users");
 
  haskid.once('value').then(function(snapshot){

  var kid = snapshot.child(aNumber).exists();
  if(kid==true){
     var person = prompt("Please enter your Secure Pin", "");
        if (person != null) {
            document.getElementById("demo").innerHTML = person ;
            var userData = haskid.child(aNumber).child("info").child("SecureKey");
            var secretPass = userData.on('value', function(datasnapshot){
              var DatabasePass = datasnapshot.val();
              if(person == DatabasePass){
              window.alert("correct Pass Entered");
              document.getElementById("Details").style.display = "block";
              document.getElementById("AllDetails").style.display = "block";
            }
            else{
              window.alert("Please Enter The correct PassKey");
            }
              });
          
            
        }
  }
  });
 }else{
  window.alert('Empety');
 }
}

