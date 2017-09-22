
$(document).on('turbolinks:load', function(){
  var timeoutId;
  var selectedCompetencies = [];
  var competencyBox = document.getElementById("selection-box"),
  ambitionBox = document.getElementById("ambition"),
  technicalBox = document.getElementById("technical"),
  creativeBox = document.getElementById("creative"),
  culturalBox = document.getElementById("cultural"),
  leadershipBox = document.getElementById("leadership"),
  emotionalBox = document.getElementById("emotional"),
  hobbiesBox = document.getElementById("hobbies"),
  customBox = document.getElementById("custom"),
  competencyHash = {"ambition": 1, "technical": 2, "creative": 3, "cultural": 4, "leadership": 5, "emotional": 6, "hobbies": 7, "custom": 8};

  var selectTool = {
    init : function() {
      var that = this;

      competencyBox.addEventListener('click', this.selectCompetency, false);
      ambitionBox.addEventListener('mouseenter', this.showSummary, false);
      technicalBox.addEventListener('mouseenter', this.showSummary, false);
      creativeBox.addEventListener('mouseenter', this.showSummary, false);
      culturalBox.addEventListener('mouseenter', this.showSummary, false);
      leadershipBox.addEventListener('mouseenter', this.showSummary, false);
      emotionalBox.addEventListener('mouseenter', this.showSummary, false);
      hobbiesBox.addEventListener('mouseenter', this.showSummary, false);
      customBox.addEventListener('mouseenter', this.showSummary, false);

    },

    selectCompetency : function(e) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
      var compId = competencyHash[e.target.dataset.title];
      newtext = "Select a Question: <br>";
      $.each(gon.questions, function (index, val){
        if (val.competency_id == compId) {
          newtext += val.text + "<br>";
        }
        $('#competency-summary').html(newtext);
      });
    },

    showSummary : function(e) {
      var compName = e.target.dataset.title;
      var compTitle = e.target.innerText;
      var compId = competencyHash[compName] - 1;
      console.log(e);
        if (!timeoutId) {
          timeoutId = window.setTimeout(function() {
            timeoutId = null;
            newtext = compTitle + " Summary: <br>" + gon.competencies[compId].summary;
            $('#competency-summary').html(newtext);
           }, 1500);
        }
      },

    function () {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    else {
      }
    }
  };

    $("#ambition").hover(function() {
        if (!timeoutId) {
            timeoutId = window.setTimeout(function() {
                timeoutId = null;
                newtext = "Ambition Summary: <br>" + gon.competencies[0].summary;
                $('#competency-summary').html(newtext);
           }, 900);
        }
    },
    function () {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        }
        else {
        }
    });


  selectTool.init();

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

  // $('#ambition').on('click', function() {
  //   newtext = "Select a Question: <br>";
  //   $.each(gon.questions, function (index, val){
  //     if (val.competency_id == 1) {
  //       newtext += val.text + "<br>";
  //     }
  //     $('#competency-summary').html(newtext);
  //   });
  // });




  // $('#technical').on('click', function() {
  //   newtext = "Select a Question: <br>";
  //   $.each(gon.questions, function (index, val){
  //     if (val.competency_id == 2) {
  //       newtext += val.text + "<br>";
  //     }
  //     $('#competency-summary').html(newtext);
  //   });
  // });

  // $('#creative').on('click', function() {
  //   newtext = "Select a Question: <br>";
  //   $.each(gon.questions, function (index, val){
  //     if (val.competency_id == 3) {
  //       newtext += val.text + "<br>";
  //     }
  //     $('#competency-summary').html(newtext);
  //   });
  // });

  // $('#cultural').on('click', function() {
  //   newtext = "Select a Question: <br>";
  //   $.each(gon.questions, function (index, val){
  //     if (val.competency_id == 4) {
  //       newtext += val.text + "<br>";
  //     }
  //     $('#competency-summary').html(newtext);
  //   });
  // });

  // $('#leadership').on('click', function() {
  //   newtext = "Select a Question: <br>";
  //   $.each(gon.questions, function (index, val){
  //     if (val.competency_id == 5) {
  //       newtext += val.text + "<br>";
  //     }
  //     $('#competency-summary').html(newtext);
  //   });
  // });

  // $('#emotional').on('click', function() {
  //   newtext = "Select a Question: <br>";
  //   $.each(gon.questions, function (index, val){
  //     if (val.competency_id == 6) {
  //       newtext += val.text + "<br>";
  //     }
  //     $('#competency-summary').html(newtext);
  //   });
  // });

  // $('#hobbies').on('click', function() {
  //   newtext = "Select a Question: <br>";
  //   $.each(gon.questions, function (index, val){
  //     if (val.competency_id == 7) {
  //       newtext += val.text + "<br>";
  //     }
  //     $('#competency-summary').html(newtext);
  //   });
  // });

  // $('#custom').on('click', function() {
  //   newtext = "Select a Question: <br>";
  //   $.each(gon.questions, function (index, val){
  //     if (val.competency_id == 8) {
  //       newtext += val.text + "<br>";
  //     }
  //     $('#competency-summary').html(newtext);
  //   });
  // });
});
