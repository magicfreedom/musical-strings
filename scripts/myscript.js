// This is where all javacripts will go



var x, text, text2, y, text3, z, text4, zz, text5, qq;



function contactForm() {


// Code to verify the name is not empty

  x = document.getElementById("fname").value; // this gets the value of the input field
  if (x == "") {
     text = "Name Can Not Be Blank";
   document.getElementById("alert1").innerHTML = text;
   }


// code to validate email

 y = document.getElementById("email").value;
 yy = /@/.test(y);
 if (yy == false){
 text2 = "That is Not a Real Email";
  document.getElementById("alert2").innerHTML = text;
 }


// code to validate address

 z = document.getElementById("address").value;
 if (z == "") {
    text3 = "address Can Not Be Blank";
  document.getElementById("alert3").innerHTML = text;
  }


 // Code to check if real person
 qq = document.getElementById("robo").value;

 if (qq != 8){
 text5 = "Wrong answer";
 document.getElementById("alert4").innerHTML = text5;
 }


}
// make id show on click

$(document).ready(function () {
    $("#show").click(function(){
        $(".section").show();
    });
});

//make id toggle on click 
$(document).ready(function () {
    $("#flip").click(function(){
    $("#menu").slideToggle(1000);
    });
});

//make id fade on click
$(document).ready(function(){
    $("#fade").click(function(){
        $("#magic").fadeOut(2000);
        
    });
});

// make animation from one after the other set with delays for id on click

$(document).ready(function(){
    $("#move").click(function(){
        $("#ourAnimate").animate({height: "100px"});
        $("#ourAnimate").fadeOut(1110);
        $("#ourAnimate").fadeIn(110);
        $("#ourAnimate").delay(2000).animate({height: "100px"});
        $("#ourAnimate").delay(2000).animate({marginLeft: "+=400px"});
        $("#ourAnimate").fadeOut(1110);
        $("#ourAnimate").fadeIn(10);
        $("#ourAnimate").animate({height: "20px"});
         $("#ourAnimate").animate({marginLeft: "-=400px"}, 1);
         $("#ourAnimate").animate({marginLeft: "+=400px"});
            
    });
    
});

