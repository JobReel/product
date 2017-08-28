
$(document).on('turbolinks:load', function(){
  fullH = document.getElementById("full-description").scrollHeight;
  $('#collapseme').on('click', function() {
    var duration = 1000,
    easing = 'swing';
              if (140 == $('#full-description').height()) {
                  $('#full-description').animate(
                      {
                          'height' : fullH + 40
                      }, duration, easing);
              }
              else {
                  $('#full-description').animate(
                      {
                          'height' : 180
                      }, duration, easing);
              }
  });
});
