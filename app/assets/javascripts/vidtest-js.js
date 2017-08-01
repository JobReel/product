$(document).on('turbolinks:load', function(){
  $('#customplay').onclick(getVideo().play());
  $('#custompause').onclick(getVideo().pause());
});
