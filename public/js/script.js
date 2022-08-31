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
});

function popup() {
  document.getElementById("popupid").classList.toggle("active");
}

function applyFormValid() {
  var a = document.forms["applyform"]["name"].value;
  var b = document.forms["applyform"]["gender"].value;
  var c = document.forms["applyform"]["mail"].value;
  var d = document.forms["applyform"]["phnum"].value;

  var phnumLen = d.toString().length;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (a == null || a == "") {
    document.getElementById("para1").innerHTML = "Name is empty!";
    return false;
  } else if (b == null || b == "") {
    document.getElementById("para1").innerHTML = "Gender is empty!";
    return false;
  } else if (c == null || c == "" || c.value != mailformat) {
    document.getElementById("para1").innerHTML = "Mail is Invalid!";
    return false;
  } else if (d == null || d == "" || phnumLen > 10 || phnumLen < 10) {
    document.getElementById("para1").innerHTML = "Phone Number is Invalid!";
    return false;
  }
}
