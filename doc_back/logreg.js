  var config = {
    apiKey: "AIzaSyCrAFKC95xCF2GvHBZoBV7fwYzzHts4NEA",
    authDomain: "meditrack-6a333.firebaseapp.com",
    databaseURL: "https://meditrack-6a333.firebaseio.com",
    storageBucket: "meditrack-6a333.appspot.com",
    messagingSenderId: "147072280269"
  };
  firebase.initializeApp(config);
   var storage = firebase.storage();



var userRef = firebase.database().ref().child("Doctors");
var patientO;
var doctorO;


function clicked(){

var daNumber = $("#aadharNumber").val();
doctorO = daNumber;
var pin = $("#pinNumber").val();

if(daNumber != "" && pin != ""){
  var email = daNumber + "@doctor.in";
  firebase.auth().signInWithEmailAndPassword(email, pin).then(function() {
  // Sign-out successful.
  
  location.href = "../html/doc_index.html";
}).catch(function(error) {
  // Handle Errors here.

  window.alert(error.message);
}

);

}

window.alert('logged in');

}

function historyPage(){
  location.href = "../doc_html/history.html";
 
}


function registerPage(){

  location.href = "../doc_html/register.html";
}


function loginPage(){
    location.href = "../html/doc_index.html";
}

function register(){
  var email = $("#id").val();
  doctorO = email;
  var pass = $("#pass").val();
  var pass2 = $("#pass2").val();
  var emailF = email + "@doctor.in";
  if(email != "" && pass != "" && pass2 != ""){
    if(pass==pass2){
        firebase.auth().createUserWithEmailAndPassword(emailF, pass).then(function() {
  if(firebase.auth().currentUser){
          var user = firebase.auth().currentUser;
          var DID = user.uid;
         
         var database1= firebase.database().ref().child("Doctors").child(DID);
         database1.child("Treated Patients").set("Prescribed Medicines");
         database1.child("Emergency Cases").set(" ");
         database1.child("info").set({
            DoctorName: email,
            HospitalName: "KIMS",
            phone: "Phone",
            Address: "Address",
            Image : "Image",
            DOB: "DOB",
    
  });
         
    
  }
                       
  location.href = "../html/doc_index.html";
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


  // HOME PAGE SCRIPTING

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
           // document.getElementById("demo").innerHTML = person ;
            var userData = haskid.child(aNumber).child("info").child("SecureKey");
            var secretPass = userData.on('value', function(datasnapshot){
              var DatabasePass = datasnapshot.val();
              if(person == DatabasePass){
                var user = firebase.auth().currentUser;
                var DID = user.uid;
                var database1= firebase.database().ref().child("Doctors").child(DID);
                database1.child("Treated Patients").child("Recent").set(aNumber);
                //database1.child("Treated Patients").child("Previous").push(aNumber);
              //window.alert("correct Pass Entered");

              // DISPLAYING LATEST PRESCRIPTION
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


// NEW PRESCRIPTION SCRIPTING

   function submitPres() {
    var DoctorName;
    var PatientName;
    var user = firebase.auth().currentUser;
    var DID = user.uid;
    var dia = document.getElementById("diagnosis").value;
    var database1= firebase.database().ref().child("Doctors").child(DID);
    var Pref = firebase.database().ref().child("Doctors").child(DID).child("Treated Patients").child("Recent");
    Pref.on('value', function(snappu){
        PatientName = snappu.val();
       // window.alert(PatientName);
        var Dref = database1.child("info").child("DoctorName");
        Dref.on('value', function(sna){
        DoctorName = sna.val();
        //window.alert(DoctorName);
        var da = new Date();
        var today =da.getMonth() + "-" + da.getDate() + "-" + da.getFullYear();
        var tie = da.getHours() + ":" + da.getMinutes();
        Pref.set(PatientName);
        var uniq = today + tie;
        // window.alert(today);


        // PRESCRIPTION!!!!!!!!!!!!!!!!!
        

        var tempRef = database1.child("Treated Patients").child("Previous").child(uniq);
        tempRef.child("Patient Name").set(PatientName);
        var tempRefP = firebase.database().ref().child("Users").child(PatientName);
        var tempRefL = firebase.database().ref().child("Users").child(PatientName).child("Total Prescription").child(uniq);
        tempRefL.child("Doctor Name").set(DoctorName);
        tempRefL.child("Date").set(today);
        tempRefP.child("Latest Prescription").child("Doctor Name").set(DoctorName);
        tempRefM = tempRefP.child("Latest Prescription").child("Medcines");
        var tempD = database1.child("info").child("HospitalName");
        tempRefP.child("Latest Prescription").child("Diagnosis").set(dia);
        tempRefP.child("Latest Prescription").child("Date").set(today);
        tempD.on('value', function(snafu){
            var t = snafu.val();
            tempRefP.child("Hospital Name").set(t);
            tempRefL.child("Hospital Name").set(t);
        });
        tempRefP.child("Latest Prescription").child("Date").child(today);
        tempRefP.child("Latest Prescription").child("Diagnosis").child(dia);
        tempRef.child("Diagnosis").set(dia);
        tempRefL.child("Diagnosis").set(dia);
        var p1 = document.getElementById('pres1').value;
        var d1 = document.getElementById('dos1').value;
        tempRefP = tempRefP.child("Latest Prescription");
        if(p1!= "" && d1!= ""){
            tempRef.child("Medcines").child("Medicine 1").child("Medicine Name").set(p1);
            tempRef.child("Medcines").child("Medicine 1").child("Dosage").set(d1);
            tempRefL.child("Medcines").child("Medicine 1").child("Medicine Name").set(p1);
            tempRefP.child("Medcines").child("Medicine 1").child("Medicine Name").set(p1);
            tempRefP.child("Medcines").child("Medicine 1").child("Dosage").set(d1);
            tempRefL.child("Medcines").child("Medicine 1").child("Dosage").set(d1);
            var e ="";
            if(document.getElementById('m1').checked){
              e = e + "Morning ";
            }
            if(document.getElementById('a1').checked){
              e = e + "Afternoon ";
            }
            if(document.getElementById('e1').checked){
              e = e + "Evening ";
            }
            if(document.getElementById('n1').checked){
              e = e + "Night";
            }
            tempRef.child("Medcines").child("Medicine 1").child("Timing").set(e);
            tempRefP.child("Medcines").child("Medicine 1").child("Timing").set(e);
            tempRefL.child("Medcines").child("Medicine 1").child("Timing").set(e);

              }
         else{
          window.alert("Cannot Leave Feilds Empty Within Same Row");
        }



             var p2 = document.getElementById('pres2').value;
             var d2 = document.getElementById('dos2').value;
             if(p2!= "" && d2!= ""){
            tempRef.child("Medcines").child("Medicine 2").child("Medicine Name").set(p2);
            tempRef.child("Medcines").child("Medicine 2").child("Dosage").set(d2);
            tempRefP.child("Medcines").child("Medicine 2").child("Medicine Name").set(p2);
            tempRefP.child("Medcines").child("Medicine 2").child("Dosage").set(d2);
            tempRefL.child("Medcines").child("Medicine 2").child("Medicine Name").set(p2);
            tempRefL.child("Medcines").child("Medicine 2").child("Dosage").set(d2);
            var e ="";
            if(document.getElementById('m2').checked){
              e = e + "Morning ";
            }
            if(document.getElementById('a2').checked){
              e = e + "Afternoon ";
            }
            if(document.getElementById('e2').checked){
              e = e + "Evening ";
            }
            if(document.getElementById('n2').checked){
              e = e + "Night";
            }
            tempRef.child("Medcines").child("Medicine 2").child("Timing").set(e);
            tempRefP.child("Medcines").child("Medicine 2").child("Timing").set(e);
            tempRefL.child("Medcines").child("Medicine 2").child("Timing").set(e);

             }

              var p3 = document.getElementById('pres3').value;
              var d3 = document.getElementById('dos3').value;
              if(p3!= "" && d3!= ""){

                tempRef.child("Medcines").child("Medicine 3").child("Medicine Name").set(p3);
                tempRef.child("Medcines").child("Medicine 3").child("Dosage").set(d3);
                tempRefP.child("Medcines").child("Medicine 3").child("Medicine Name").set(p3);
                tempRefP.child("Medcines").child("Medicine 3").child("Dosage").set(d3);
                tempRefL.child("Medcines").child("Medicine 3").child("Medicine Name").set(p3);
                tempRefL.child("Medcines").child("Medicine 3").child("Dosage").set(d3);
                var e ="";
                if(document.getElementById('m3').checked){
                  e = e + "Morning ";
                }
                if(document.getElementById('a3').checked){
                  e = e + "Afternoon ";
                }
                if(document.getElementById('e3').checked){
                  e = e + "Evening ";
                }
                if(document.getElementById('n3').checked){
                  e = e + "Night";
                }
                tempRef.child("Medcines").child("Medicine 3").child("Timing").set(e);
                tempRefP.child("Medcines").child("Medicine 3").child("Timing").set(e);
                tempRefL.child("Medcines").child("Medicine 3").child("Timing").set(e);


              }
              var p4 = document.getElementById('pres4').value;
              var d4 = document.getElementById('dos4').value;
              if(p4!= "" && d4!= ""){

                tempRef.child("Medcines").child("Medicine 4").child("Medicine Name").set(p4);
                tempRef.child("Medcines").child("Medicine 4").child("Dosage").set(d4);
                tempRefP.child("Medcines").child("Medicine 4").child("Medicine Name").set(p4);
                tempRefP.child("Medcines").child("Medicine 4").child("Dosage").set(d4);
                tempRefL.child("Medcines").child("Medicine 4").child("Medicine Name").set(p4);
                tempRefL.child("Medcines").child("Medicine 4").child("Dosage").set(d4);   
                var e ="";
                if(document.getElementById('m4').checked){
                  e = e + "Morning ";
                }
                if(document.getElementById('a4').checked){
                  e = e + "Afternoon ";
                }
                if(document.getElementById('e4').checked){
                  e = e + "Evening ";
                }
                if(document.getElementById('n4').checked){
                  e = e + "Night";
                }
                tempRef.child("Medcines").child("Medicine 4").child("Timing").set(e);
                tempRefP.child("Medcines").child("Medicine 4").child("Timing").set(e);
                tempRefL.child("Medcines").child("Medicine 4").child("Timing").set(e);


                  }
                var p5 = document.getElementById('pres5').value;
                var d5 = document.getElementById('dos5').value;
                if(p5!= "" && d5!= ""){
                  tempRef.child("Medcines").child("Medicine 5").child("Medicine Name").set(p5);
                  tempRef.child("Medcines").child("Medicine 5").child("Dosage").set(d5);
                  tempRefP.child("Medcines").child("Medicine 5").child("Medicine Name").set(p5);
                  tempRefP.child("Medcines").child("Medicine 5").child("Dosage").set(d5);
                  tempRefL.child("Medcines").child("Medicine 5").child("Medicine Name").set(p5);
                  tempRefL.child("Medcines").child("Medicine 5").child("Dosage").set(d5);
                  var e ="";
                  if(document.getElementById('m5').checked){
                    e = e + "Morning ";
                  }
                  if(document.getElementById('a5').checked){
                    e = e + "Afternoon ";
                  }
                  if(document.getElementById('e5').checked){
                    e = e + "Evening ";
                  }
                  if(document.getElementById('n5').checked){
                    e = e + "Night";
                  }
                  tempRef.child("Medcines").child("Medicine 5").child("Timing").set(e);
                  tempRefP.child("Medcines").child("Medicine 5").child("Timing").set(e);
                  tempRefL.child("Medcines").child("Medicine 5").child("Timing").set(e);
                }
              

              window.alert("Presciption Submitted");




    });

    });
    
   }

      // HISTORY PAGE SCRIPT


 