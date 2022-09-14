$(document).ready(function () {
  var form = $(".login-form");
  var status = false;
  $("#login").click(function (event) {
    event.preventDefault();
    if (status == false) {
      form.fadeIn();
      status = true;
    } else {
      form.fadeOut();
      form2.fadeOut();
      status = false;
    }
  });
  var form2 = $(".signup-form");
  var status2 = false;
  var status3 = false;
  $("#new-user").click(function (event) {
    event.preventDefault();
    if (status2 == false) {
      form.fadeOut();
      form2.fadeIn();
      status2 = true;
    } else {
      form2.fadeOut();
      status2 = false;
    }
  });
  $("#applybtn").click(function(event){
    event.preventDefault();
    if(status3 == false){
      form2.fadeIn();
      status3 = true
    }else{
      form2.fadeOut();
      status3 = false;
    }
  })
});
function popupSignup(){
  document.getElementById("popupid2").classList.toggle("active");
}
function signupValid() {
  var name  = document.forms["signupForm"]["name"].value;
  var email = document.forms["signupForm"]["email"].value;
  var pswd = document.forms["signupForm"]["password"].value;

  if(name == null || name == ""){
    document.getElementById("para2").innerHTML = "name is Empty!"
  }
  else if(email == null || email == ""){
    document.getElementById("para2").innerHTML = "email is Empty!"
  }
  else if(pswd == null || pswd == ""){
    document.getElementById("para2").innerHTML = "Password is Empty!"
  }
  else{
    popupSignup();
  }
}

