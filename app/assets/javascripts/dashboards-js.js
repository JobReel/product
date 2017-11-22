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
        $("#hidden").css('display', 'inline');
      }
    });
    $("#team-title-active").click(function() {
      if ($('#team-title-active').prop("disabled")){
      } else {
        $(this).css('background-color', '#ffffff');
        $(this).attr('disabled','disabled');
        $("#team-title-inactive").css('background-color', '#eceeef');
        $("#hidden").css('display', 'none');
        $("#show").css('display', 'inline');
      }
    });

    $('#trash').click(function(e){
      userid = parseInt(e.target.dataset.userid)
      teamids = JSON.parse(e.target.parentNode.parentNode.dataset.teamids)
      jobid = parseInt(e.target.parentNode.parentNode.dataset.jobid)
      
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result == true) {
          var removeUserId = teamids.indexOf(userid)

          if (removeUserId > -1) {
            teamids.splice(removeUserId, 1);
          }

          var payload = {};
          payload["team_ids"] = teamids

          $.ajax({
            'type' : 'PATCH',
            'url': "/jobs/" + jobid,
            'dataType' : 'JSON',
            'data': {job: payload},
            statusCode: {
                     200: function (response) {
                            console.log(response);
                            swal(
                              'Deleted!',
                              'Your file has been deleted.',
                              'success'
                            );
                          },
                     500: function (response) {
                      alert('something went wrong :(');
                     }
            }
          });          
        } // end of if
        window.location.reload();
      })       
    });

    addToTeam = document.getElementsByClassName("btn-team");

    Array.from(addToTeam).forEach(function(elem) {
      elem.addEventListener('click', function(e) {
        jobID = e.target.dataset.jobid;

      $(this).blur()
      swal({
        title: 'Add to Hiring Team',
        customClass: 'dashboard-add-team-modal',
        onOpen: function () {
          //get all the users
            $.ajax({
            'type' : 'GET',
            'url': "/addtoteamAPI/",
            'dataType' : 'JSON',
            statusCode: {
                     200: function (response) {
                            console.log(response);
                            alert('omg it worked');
                            buildUserCards(response);
                            // window.location.replace("http://localhost:3030/step2/"+response.id);
                          },
                     500: function (response) {
                      console.log(response);
                      alert('something went wrong :(');
                     }
            }
          });

        }
      })
    });
    })

    function buildUserCards(response) {
      // var teamHTML = '<div class="row nomargin team-background">                <div class="col-1 team-avatar-image vert-align">
      //             // <% if checking.image_id? %>
      //             //   <%= cl_image_tag(checking.image_id, :width => 50, :height => 50, :crop => :thumb, :gravity => :face, :radius => :max) %>
      //             // <% else %>
      //             //   <%= cl_image_tag(checking.image, :width => 50, :height => 50, :crop => :thumb, :gravity => :face, :radius => :max) %>
      //             // <% end %>
      //           </div>
      //           <div class="col-2 team-title-sub team-title-sub">
      //                 // <h3><%= checking.first_name %></h3>
      //                 // <h4><%= checking.title %></h4>        
      //           </div>
      //       </div>'
      // response.forEach(function(user) {
      //   var userHTML = '<div class="col-1 team-avatar-image vert-align">'

      //   teamHTML += userHTML;
      // });
    }

    // document.getElementsByClassName("btn-team").onclick = function() {
    //   $(this).blur()
    //   swal({
    //     title: 'How old are you?',
    //     type: 'question',
    //     input: 'range',
    //     inputAttributes: {
    //       min: 8,
    //       max: 120,
    //       step: 1
    //     },
    //     inputValue: 25
    //   })
    // };

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
