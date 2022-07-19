$(document).ready(function(){
    var form = $(".login-form");
    var status = false;
    $("#login").click(function(event){
        event.preventDefault()
        if(status == false){
            form.fadeIn();
            status = true;
        }
        else{
            form.fadeOut();
            form2.fadeOut();
            status = false;
        }
    })
      var form2 = $(".signup-form");
      var status2 = false
      $("#new-user").click(function(event){
        event.preventDefault();
        if(status2 == false){
          form.fadeOut();
          form2.fadeIn();
          status2 = true;
        }
        else{
          form2.fadeOut();
          status2 = false;
        }
      })
})

