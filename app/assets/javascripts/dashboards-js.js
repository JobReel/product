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

    removeFromTeam = document.getElementsByClassName("team-trash");

    Array.from(removeFromTeam).forEach(function(elem) {
      elem.addEventListener('click', function(e) {
      userid = parseInt(e.target.dataset.userid)
      teamids = JSON.parse(e.target.parentNode.parentNode.dataset.teamids)
      jobid = parseInt(e.target.parentNode.parentNode.dataset.jobid)
      removeUserId = teamids.indexOf(userid)

      if (removeUserId > -1) {
        teamids.splice(removeUserId, 1);
      }

      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        preConfirm: function () {
                if (teamids.length == 0) {
                  swal.showValidationError('Cannot remove last person from job.')
                  // swal.clickCancel();
                
                }
              }
      }).then(function (result) {
        if (result == true) {


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
    });

    addNewPerson = document.getElementsByClassName("btn-add-team");

    Array.from(addNewPerson).forEach(function(elem) {
      elem.addEventListener('click', function(e) {
        userID = e.target.dataset.jobid;

      $(this).blur()
      swal({
        title: 'Add to a Team',
        customClass: 'dashboard-add-team-modal',
        onOpen: function () {
          $('.swal2-content').empty();
          //get all the users
            $.ajax({
            'type' : 'GET',
            'url': "/addnewpersonAPI/",
            'dataType' : 'JSON',
            statusCode: {
                     200: function (response) {
                            console.log(response);
                            buildTeamCards(response);
                            // window.location.replace("http://localhost:3030/step2/"+response.id);
                          },
                     500: function (response) {
                      console.log(response);
                      alert('something went wrong :(');
                     }
            }
          });

        } //end of onOpen function
      })
    });
    })

    function buildTeamCards(response) {
      var teamHTML = '<div class="nomargin team-background">'

      response.forEach(function(job) {
        var userHTML = '<div class="row nomargin addteamcard" data-jobID="'+job.id+'"><div class="col-1 team-image-modal" data-jobID="'+job.id+'"><img width="60" height="60" src="http://res.cloudinary.com/jobreel/image/upload/c_thumb,h_60,w_60/v1511371578/employer1.png" alt="Employer1"></div>'
          userHTML = userHTML + '<div class="col-5 team-title-main team-title" data-jobID="'+job.id+'"><h3 data-jobID="'+job.id+'">' + job.job_title + '</h3>' + '<div><i class="fa fa-map-marker team-title-icon" aria-hidden="true"></i><h4 data-jobID="'+job.id+'">' + job.city + ', ' + job.state +'</h4></div></div>'
          userHTML = userHTML +  '<div class="col-5 team-title-main team-title" data-jobID="'+job.id+'"><h3 data-jobID="'+job.id+'">Published: </h3><h4 data-jobID="'+job.id+'">February 11th, 2017</h4></div></div>'
        teamHTML = teamHTML + userHTML;
      });

      teamHTML = teamHTML + '</div>'
      $(".swal2-content").append(teamHTML);
      $(".swal2-content").css({'display': 'inline-block'})

      teamCards = document.getElementsByClassName("addteamcard");

      Array.from(teamCards).forEach(function(elem) {
        elem.addEventListener('click', function(e) {
          selectedID = parseInt(e.target.parentElement.dataset.jobid);
          activeTeamCard = $('.addteamcard[data-jobID="'+selectedID+'"]')

          if (activeTeamCard.hasClass('dashboard-active-select')) {
            //deselect a user
            activeTeamCard.removeClass('dashboard-active-select')
          }
          else {
          //select a user
          activeTeamCard.addClass('dashboard-active-select')
  
          }
          
        });
        });

    }
    // End add new person to team


    addToTeam = document.getElementsByClassName("btn-team");

    Array.from(addToTeam).forEach(function(elem) {
      elem.addEventListener('click', function(e) {
        jobID = e.target.dataset.jobid;

      $(this).blur()
      swal({
        title: 'Add to Hiring Team',
        customClass: 'dashboard-add-team-modal',
        onOpen: function () {
          $('.swal2-content').empty();
          //get all the users
            $.ajax({
            'type' : 'GET',
            'url': "/addtoteamAPI/",
            'dataType' : 'JSON',
            statusCode: {
                     200: function (response) {
                            console.log(response);
                            buildUserCards(response);
                            // window.location.replace("http://localhost:3030/step2/"+response.id);
                          },
                     500: function (response) {
                      console.log(response);
                      alert('something went wrong :(');
                     }
            }
          });

        } //end of onOpen function
      })
    });
    })

    function buildUserCards(response) {
      var teamHTML = '<div class="row nomargin team-background">'
      response.forEach(function(user) {
        var userHTML = '<div class="row nomargin col-4 addusercard" data-userid="'+user.id+'"><div class="col-3 team-avatar-image vert-align" data-userid="'+user.id+'">'
          if (user.image_id !== null) {
            //display the user-uploaded image
              var userHTML = userHTML + '<img width="50" height="50" src="http://res.cloudinary.com/jobreel/image/upload/c_thumb,g_face,h_50,r_max,w_50/' + user.image_id + '" alt="' + user.image_id + '" data-userid="'+user.id+'"></div>'
          }
          else {
              var userHTML = userHTML +  '<img width="50" height="50" src="' + user.image.url + '" data-userid="'+user.id+'"></div>'
          }

          userHTML = userHTML + '<div class="col-6 team-title-sub team-title-sub" data-userid="'+user.id+'"><h3 data-userid="'+user.id+'">' + user.first_name + '</h3>' + '<h4 data-userid="'+user.id+'">' + user.title + '</h4></div>'


          userHTML = userHTML +  '<div class="col-3" data-userid="'+user.id+'">&nbsp</div></div>'

        teamHTML = teamHTML + userHTML;
      });
      teamHTML = teamHTML + '</div>'
      $(".swal2-content").append(teamHTML);
      $(".swal2-content").css({'display': 'inline-block'})

      userCards = document.getElementsByClassName("addusercard");

      Array.from(userCards).forEach(function(elem) {
        elem.addEventListener('click', function(e) {
          selectedID = parseInt(e.target.parentElement.dataset.userid);
          activeUserCard = $('.addusercard[data-userid="'+selectedID+'"]')

          if (activeUserCard.hasClass('dashboard-active-select')) {
            //deselect a user
            activeUserCard.removeClass('dashboard-active-select')
          }
          else {
          //select a user
          activeUserCard.addClass('dashboard-active-select')
  
          }
          
        });
        });

    }
    // End add to team    
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
