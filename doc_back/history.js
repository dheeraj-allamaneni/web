  var config = {
    apiKey: "AIzaSyCrAFKC95xCF2GvHBZoBV7fwYzzHts4NEA",
    authDomain: "meditrack-6a333.firebaseapp.com",
    databaseURL: "https://meditrack-6a333.firebaseio.com",
    storageBucket: "meditrack-6a333.appspot.com",
    messagingSenderId: "147072280269"
  };
  firebase.initializeApp(config);
  // var storage = firebase.storage();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var DID = user.uid;
     //window.alert(DID);
    var Pref = firebase.database().ref().child("Doctors").child(DID).child("Treated Patients").child("Recent");
    Pref.on('value', function(snappu){
        PatientName = snappu.val();
        //window.alert(PatientName);
       
        var newReference = firebase.database().ref().child("Users").child(PatientName).child("Total Prescription");
        newReference.on("child_added", snap => {
                  var pDate = snap.child("Date").val();
                  var pDiagnosis = snap.child("Diagnosis").val();
                  var pDoctorName = snap.child("Doctor Name").val();
                  var pHospital = snap.child("Hospital Name").val();
                  $("#tableDoctorName").append("<tr><td>" + pHospital + "</td><td>" + pDoctorName + "</td><td>" + pDiagnosis + "</td><td>" + pDate + "</td></tr>");
                  newReference.child("Medcines").on("child_added", fap =>{
                    var medName = fap.child("Medicine Name").val();
                    var Dos = fap.child("Dosage").val();
                    var timing = fap.child("Timing").val();
                    $("#tableDoctorBody").append("<tr><td>" + medName + "</td><td>" + Dos + "</td><td>" + timing + "</td><tr>");
                  });
                  
              });


      });
  }
  else{
    window.alert('Signed Out');
  }
    });
    
