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
}

   function submitPres() {
   		first();
   		second();
   		third();
   		fourth();
   		fifth();

 }

 function first(){
 	var p1 = document.getElementById('pres1').value;
 	var d1 = document.getElementById('dos1').value;
 	if(p1!= "" && d1!= ""){

 	}
 	else{
 		window.alert("Cannot Leave Feilds Empty Within Same Row");
 	}
 }

 function second(){
 	var p1 = document.getElementById('pres2').value;
 	var d1 = document.getElementById('dos2').value;
 	if(p1!= "" && d1!= ""){
 		
 	}else{
 		window.alert("Cannot Leave Feilds Empty Within Same Row");
 	}
 }

 function third(){
 	var p1 = document.getElementById('pres3').value;
 	var d1 = document.getElementById('dos3').value;
 	if(p1!= "" && d1!= ""){
 		
 	}else{
 		window.alert("Cannot Leave Feilds Empty Within Same Row");
 	}

 }

 function fourth(){
 	var p1 = document.getElementById('pres4').value;
 	var d1 = document.getElementById('dos4').value;
 	if(p1!= "" && d1!= ""){
 		
 	}else{
 		window.alert("Cannot Leave Feilds Empty Within Same Row");
 	}
 }

 function fifth(){
 	var p1 = document.getElementById('pres5').value;
 	var d1 = document.getElementById('dos5').value;
 	if(p1!= "" && d1!= ""){
 		
 	}else{
 		window.alert("Cannot Leave Feilds Empty Within Same Row");
 	}

 }