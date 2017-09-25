
$(document).on('turbolinks:load', function(){
  if ($('#selection-box').length > 0) {
  var timeoutId;
  var selectedQuestions = [];
  var competencyBox = document.getElementById("selection-box"),
  ambitionBox = document.getElementById("ambition"),
  technicalBox = document.getElementById("technical"),
  creativeBox = document.getElementById("creative"),
  culturalBox = document.getElementById("cultural"),
  leadershipBox = document.getElementById("leadership"),
  emotionalBox = document.getElementById("emotional"),
  hobbiesBox = document.getElementById("hobbies"),
  customBox = document.getElementById("custom"),
  questionSpan = document.getElementById("competency-summary"),
  competencyHash = {"ambition": 1, "technical": 2, "creative": 3, "cultural": 4, "leadership": 5, "emotional": 6, "hobbies": 7, "custom": 8};

  var selectTool = {
    init : function() {
      var that = this;

      competencyBox.addEventListener('click', this.selectCompetency, false);
      ambitionBox.addEventListener('mouseenter', this.showSummary, false);
      ambitionBox.addEventListener('mouseout', this.resetTimeout, false);
      technicalBox.addEventListener('mouseenter', this.showSummary, false);
      technicalBox.addEventListener('mouseout', this.resetTimeout, false);
      creativeBox.addEventListener('mouseenter', this.showSummary, false);
      creativeBox.addEventListener('mouseout', this.resetTimeout, false);
      culturalBox.addEventListener('mouseenter', this.showSummary, false);
      culturalBox.addEventListener('mouseout', this.resetTimeout, false);
      leadershipBox.addEventListener('mouseenter', this.showSummary, false);
      leadershipBox.addEventListener('mouseout', this.resetTimeout, false);
      emotionalBox.addEventListener('mouseenter', this.showSummary, false);
      emotionalBox.addEventListener('mouseout', this.resetTimeout, false);
      hobbiesBox.addEventListener('mouseenter', this.showSummary, false);
      hobbiesBox.addEventListener('mouseout', this.resetTimeout, false);
      customBox.addEventListener('mouseenter', this.showSummary, false);
      customBox.addEventListener('mouseout', this.resetTimeout, false);
      competencyBox.addEventListener('mouseout', this.resetTimeout, false);

      this.handleQuestions();

    },

    selectCompetency : function(e) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
      var compId = competencyHash[e.target.dataset.title];
      newtext = "Select a Question: <br>";
      $.each(gon.questions, function (index, val){
        if (val.competency_id == compId) {
          newtext += "<span data-questionId='" + val.id + "'>" + val.text + "</span> <br>";
        }
        $('#competency-summary').html(newtext);
      });
    },

    showSummary : function(e) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
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

    handleQuestions : function() {
      questionSpan.addEventListener('click', grabId, false)

      function grabId(e) {
        console.log(e);
        var questionId = e.target.dataset.questionid;
        selectedQuestions.push(questionId);
        console.log(selectedQuestions);
      }
    },

    resetTimeout : function () {
        window.clearTimeout(timeoutId);
        timeoutId = null;
    }
  };

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
};
});
