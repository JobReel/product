$(document).on('turbolinks:load', function(){
  if ($('body').hasClass("dashboards-settings")) {
    var inputspassword = document.getElementById('password-update-form');
    for(var i=0; i<inputspassword.length; i++){
      if(inputspassword[i].type == "password"){
        inputspassword[i].onkeyup = doPasswordCheck;
        inputspassword[i].onblur = doPasswordCheck;
      }
    };

    var inputs = document.getElementById('email-update-form');
    for(var i=0; i<inputs.length; i++){
      if(inputs[i].type == "password"){
        inputs[i].onkeyup = doCheck;
        inputs[i].onblur = doCheck;
      }
    };

  // email form success
    $("form#email-update-form").bind ("ajax:success", function(e, data, status, xhr){
      swal({
        title: 'Your email has been updated!',
        type: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      window.location.reload();
    });

  // email form error
    $("form#email-update-form").bind ("ajax:error", function(e, data, status, xhr){
      if (data.responseJSON.data.length > 1) {
        errormessages = data.responseJSON.data[0] + " & " + data.responseJSON.data[1];
      } else {
       errormessages = data.responseJSON.data[0];
      }
      
      document.getElementById('user_current_password').value = "";
      document.getElementById('user_email').value = document.getElementById('user_email_placeholder').value;
          
      swal({
        title: 'Oops...',
        type: "error",
        html: errormessages,
        onClose: function () {
          document.getElementById('email-update-button').disabled = true;    
        }
      });
    });

  // password form success
    $("form#password-update-form").bind ("ajax:success", function(e, data, status, xhr){
      swal({
        title: 'Your password has been updated!',
        type: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      window.location.reload();
    });

  // password form error
    $("form#password-update-form").bind ("ajax:error", function(e, data, status, xhr){
      if (data.responseJSON.data.length > 1) {
        errormessages = data.responseJSON.data[0] + " & " + data.responseJSON.data[1];
      } else {
       errormessages = data.responseJSON.data[0];
      }

  // setting all password form fields to blank
      var elements = document.getElementById("password-update-form");
      for (var ii=0; ii < elements.length; ii++) {
        if (elements[ii].type == "password") {
          elements[ii].value = "";
        }
      }

      swal({
        title: 'Oops...',
        type: "error",
        html: errormessages,
        onClose: function () {
          document.getElementById('password-update-button').disabled = true;    
        }
      });
    });

  // Checking for text box entries to enable update button
    function doCheck(){
      var allFilled = true;
        
      var inputs = document.getElementById('email-update-form');
      for(var i=0; i<inputs.length; i++) {
        if(inputs[i].type == "password" && inputs[i].value == ''){
          allFilled = false;
          break;
        }
      }
      document.getElementById("email-update-button").disabled = !allFilled;
    };

    function doPasswordCheck(){
      var allFilled = true;
        
      var inputs = document.getElementById('password-update-form');
      for(var i=0; i<inputs.length; i++) {
        if(inputs[i].type == "password" && inputs[i].value == ''){
          allFilled = false;
          break;
        }
      }
      document.getElementById("password-update-button").disabled = !allFilled;
    };
  }
// End dashboard-settings

  if ($('body').hasClass("dashboards-team")) {
    $("#team-title-inactive").click(function() {
      if ($('#team-title-inactive').prop("disabled")){
      } else {
        $(this).css('background-color', '#ffffff');
        $(this).attr('disabled','disabled');
        $("#team-title-active").css('background-color', '#eceeef');
        $("#show").css('display', 'none');
        $("#hidden").css('display', 'inline-block');
      }
    });
    $("#team-title-active").click(function() {
      if ($('#team-title-active').prop("disabled")){
      } else {
        $(this).css('background-color', '#ffffff');
        $(this).attr('disabled','disabled');
        $("#team-title-inactive").css('background-color', '#eceeef');
        $("#hidden").css('display', 'none');
        $("#show").css('display', 'inline-block');
      }
    });   

    document.getElementById("addToTeam").onclick = function() {
      $(this).blur()

  

swal({
  title: 'How old are you?',
  type: 'question',
  input: 'range',
  inputAttributes: {
    min: 8,
    max: 120,
    step: 1
  },
  inputValue: 25
})


    };
  }
// End dashboard-team

});
// End turbo links


function cloudAvatar() {
  cloudinary.openUploadWidget({ cloud_name: 'jobreel', upload_preset: 'chnxgah2', theme: 'minimal', sources: ['local'], client_allowed_formats: ["png", "gif", "jpeg", "jpg"], multiple: 'false', cropping: 'server'},
  function(error, result) { console.log(error, result) });
}

$(document).on('cloudinarywidgetsuccess', function(e, data) {
  console.log("Global success", e, data);
  activeUser = gon.user_id;
    dataObj = {};
    dataObj["image_id"] = data[0].public_id

    $.ajax({
      'type' : 'POST',
      'method' : 'PATCH',
      'url': "/users/" + activeUser,
      'dataType' : 'JSON',
      'data': {user: dataObj},
      'success': function(response){
        alert('save successful')
    }
  });
  location.reload();
});
