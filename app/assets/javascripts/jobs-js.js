
$(document).on('turbolinks:load', function(){
  $('#collapseme').on('click', function() {
    fullH = document.getElementById("full-description").scrollHeight;
    var duration = 1000,
    easing = 'swing';
              if (140 == $('#full-description').height()) {
                  $('#full-description').animate(
                      {
                          'height' : fullH + 80
                      }, duration, easing);
                  $('#collapseme').html("Hide full job description <i class='fa fa-chevron-up'></i>");
              }
              else {
                  $('#full-description').animate(
                      {
                          'height' : 180
                      }, duration, easing);
                    $('#collapseme').html("Read full job description <i class='fa fa-chevron-down'></i>");
              }
  });

  $('#ambition').on('click', function() {
    newtext = "Select a Question: <br>";
    $.each(gon.questions, function (index, val){
      if (val.competency_id == 1) {
        newtext += val.text + "<br>";
      }
      $('#competency-summary').html(newtext);
    });
  });

  $('#technical').on('click', function() {
    newtext = "Select a Question: <br>";
    $.each(gon.questions, function (index, val){
      if (val.competency_id == 2) {
        newtext += val.text + "<br>";
      }
      $('#competency-summary').html(newtext);
    });
  });

  $('#creative').on('click', function() {
    newtext = "Select a Question: <br>";
    $.each(gon.questions, function (index, val){
      if (val.competency_id == 3) {
        newtext += val.text + "<br>";
      }
      $('#competency-summary').html(newtext);
    });
  });

  $('#cultural').on('click', function() {
    newtext = "Select a Question: <br>";
    $.each(gon.questions, function (index, val){
      if (val.competency_id == 4) {
        newtext += val.text + "<br>";
      }
      $('#competency-summary').html(newtext);
    });
  });

  $('#leadership').on('click', function() {
    newtext = "Select a Question: <br>";
    $.each(gon.questions, function (index, val){
      if (val.competency_id == 5) {
        newtext += val.text + "<br>";
      }
      $('#competency-summary').html(newtext);
    });
  });

  $('#emotional').on('click', function() {
    newtext = "Select a Question: <br>";
    $.each(gon.questions, function (index, val){
      if (val.competency_id == 6) {
        newtext += val.text + "<br>";
      }
      $('#competency-summary').html(newtext);
    });
  });

  $('#hobbies').on('click', function() {
    newtext = "Select a Question: <br>";
    $.each(gon.questions, function (index, val){
      if (val.competency_id == 7) {
        newtext += val.text + "<br>";
      }
      $('#competency-summary').html(newtext);
    });
  });

  $('#custom').on('click', function() {
    newtext = "Select a Question: <br>";
    $.each(gon.questions, function (index, val){
      if (val.competency_id == 8) {
        newtext += val.text + "<br>";
      }
      $('#competency-summary').html(newtext);
    });
  });
});
