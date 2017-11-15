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
  if ($('body').hasClass("dashboards-show")) {
function cloudAvatar() {
  cloudinary.openUploadWidget({ cloud_name: 'jobreel', upload_preset: 'chnxgah2', theme: 'minimal', sources: ['local'], client_allowed_formats: ["png", "gif", "jpeg", "jpg"], multiple: 'false', cropping: 'server'},
  function(error, result) { console.log(error, result) });
}

$(document).on('turbolinks:load', function(){
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
  alert("OKAY!");
  console.log(e);
  console.log(data);
  window.location.replace("http://localhost:3030/dashboards/");
}
);

$("form#test-email-form").bind ("ajax:error", function(e, data, status, xhr){
  alert("error");
  console.log(e);
  console.log(data);
  console.log(status);
  swal("Oops...", data.responseJSON.data[0], "error");
}
);
});
}