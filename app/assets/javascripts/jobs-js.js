
$(document).on('turbolinks:load', function(){
  fullH = document.getElementById("full-description").scrollHeight;
  $('#collapseme').on('click', function() {
    var duration = 1000,
    easing = 'swing';
              if (160 == $('#full-description').height()) {
                  $('#full-description').animate(
                      {
                          'height' : fullH + 60
                      }, duration, easing);
              }
              else {
                  $('#full-description').animate(
                      {
                          'height' : 200
                      }, duration, easing);
              }
  });
});
