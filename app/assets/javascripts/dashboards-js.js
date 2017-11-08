// swalDelete({
//   title: 'Are you sure?',
//   text: "You won't be able to revert this!",
//   type: 'warning',
//   showCancelButton: true,
//   confirmButtonColor: '#3085d6',
//   cancelButtonColor: '#d33',
//   confirmButtonText: 'Yes, delete it!'
// }).then(function () {
//   swal(
//     'Deleted!',
//     'Your file has been deleted.',
//     'success'
//   )
// })
$(document).on('turbolinks:load', function(){
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

$("form#test-email-form").bind ("ajax:success", function(e, data, status, xhr){
  console.log(e);
  console.log(data);
  swal({
    title: 'Your email has been updated!',
    type: 'success',
    showConfirmButton: false,
    timer: 1500
  });
  window.location.reload();
}
);

$("form#test-email-form").bind ("ajax:error", function(e, data, status, xhr){
  console.log(e);
  console.log(data);
  console.log(status);
  
  if (data.responseJSON.data.length > 1) {
    errormessages = data.responseJSON.data[0] + " & " + data.responseJSON.data[1];
  } else {
   errormessages = data.responseJSON.data[0];
  }

  swal('Oops...', errormessages, "error");

  document.getElementById('user_email').value = document.getElementById('user_email_placeholder').value;
  document.getElementById('user_current_password').value = "";
}
);
});