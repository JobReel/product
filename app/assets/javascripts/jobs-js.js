
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
  createButton = document.getElementById("save-job"),
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

      createButton.addEventListener('click', this.pushPayload, false);

      this.handleQuestions();

    },

    selectCompetency : function(e) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
      var compId = competencyHash[e.target.dataset.title];
      newtext = "Select a Question: <br>";
      $.each(gon.questions, function (index, val){
        if (val.competency_id == compId) {
          newtext += "<span data-questionId='" + val.id + "' data-competency= '" + e.target.dataset.title + "'>" + val.text + "</span> <br>";
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
        if (!timeoutId) {
          timeoutId = window.setTimeout(function() {
            timeoutId = null;
            newtext = compTitle + " Summary: <br>" + gon.competencies[compId].summary;
            $('#competency-summary').html(newtext);
           }, 1500);
        }
      },

    handleQuestions : function() {
      questionSpan.addEventListener('click', grabId, false);

      function grabId(e) {
        if (e.target.dataset.questionid.length > 0) {
        var questionId = e.target.dataset.questionid;
        var questionComp = e.target.dataset.competency;
        var newHTML ='';
        if (selectedQuestions.includes(questionId)) {
          selectedQuestions.splice(selectedQuestions.indexOf(questionId), 1);
        }
        else {
          selectedQuestions.push(questionId);
          newHTML +='<div class="col-12 nopadding" id="question-'+questionId+'"><div class="row nomargin"><div class="col-1 dashboard-top vert-align"><div><img src="/assets/'+
          questionComp +
          '.gif" alt="'+ questionComp +'"></div></div><div class="col-10 dashboard-sidebar vert-align">' +
                e.target.innerHTML +
              '</div><div class="col-1 text-center"><span class="vert-helper"></span><i class="fa fa-trash-o" aria-hidden="true" data-questionId="'+questionId+'"></i></div></div><div class="sentence-divider">&nbsp;</div></div>';
              console.log(newHTML);
          $('#selected-questions').prepend(newHTML);
          newHTML = '';

          document.getElementsByClassName('fa-trash-o')[0].addEventListener('click', removeQuestion, false);

          function removeQuestion(e){
            thisId = e.target.dataset.questionid;
            selectedQuestions.splice(selectedQuestions.indexOf(thisId), 1);
            $('#question-'+thisId).remove();
          }
        }
        console.log(selectedQuestions);
      }
    }
    },

    resetTimeout : function () {
        window.clearTimeout(timeoutId);
        timeoutId = null;
    },

    pushPayload : function () {

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
