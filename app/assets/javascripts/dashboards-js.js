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

function sweet() {
    swal({
      html: $('<div>')
      .addClass('some-class')
      .text('jQuery is everywhere.'),
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Upload!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i> No!',
      cancelButtonAriaLabel: 'Thumbs down',
      customClass: 'swal-avatar-size',
      background: '#fff url(/assets/avatar_background.png)',
    });
}

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
