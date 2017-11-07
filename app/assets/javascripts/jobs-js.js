
$(document).on('turbolinks:load', function(){
  if ($('body').hasClass("jobs-new")) {
  var timeoutId;
  var selectedQuestions = [];
  var selectedComps = [];
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
      var compName = e.target.dataset.title;
      var compTitle = e.target.innerText;
      var compId = competencyHash[compName] - 1;
        if (!timeoutId) {
          timeoutId = window.setTimeout(function() {
            timeoutId = null;
            newtext = compTitle + " Summary: <br>" + gon.competencies[compId].summary;
            $('#competency-summary').html(newtext);
           }, 1200);
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
          $('#question-'+questionId).remove();
          var index = selectedComps.indexOf(questionComp);
          if (index >= 0) {
            selectedComps.splice( index, 1 );
          }
        }
        else {
          selectedComps.push(questionComp);
          selectedQuestions.push(questionId);
          newHTML +='<div class="col-12 nopadding" id="question-'+questionId+'"><div class="row nomargin"><div class="col-1 dashboard-top vert-align"><div><img src="/assets/'+
          questionComp +
          '.gif" alt="'+ questionComp +'"></div></div><div class="col-10 dashboard-sidebar vert-align">' +
                e.target.outerHTML +
              '</div><div class="col-1 text-center"><span class="vert-helper"></span><i class="fa fa-trash-o" aria-hidden="true" data-questionId="'+questionId+'" data-competency="'+questionComp+'"></i></div></div><div class="sentence-divider">&nbsp;</div></div>';
          $('#selected-questions').prepend(newHTML);
          newHTML = '';

          document.getElementsByClassName('fa-trash-o')[0].addEventListener('click', removeQuestion, false);
          }
        console.log(selectedQuestions);
        console.log(selectedComps);
        }
      };

        function removeQuestion(e){
          thisId = e.target.dataset.questionid;
          questionComp = e.target.dataset.competency;
          index = selectedComps.indexOf(questionComp);
          selectedQuestions.splice(selectedQuestions.indexOf(thisId), 1);
          $('#question-'+thisId).remove();
          if (index >= 0) {
            selectedComps.splice( index, 1 );
          }
        }
    },

    resetTimeout : function () {
        window.clearTimeout(timeoutId);
        timeoutId = null;
    },

    pushPayload : function () {
      var payload = {};
      // user_id, company_name, job_title, city, state, job_description, requirements, question_id
      jobTitle = document.getElementById('job-title').value;
      jobCity = document.getElementById('city').value;
      jobState = document.getElementById('state').value;
      jobReqs = selectedComps;
      jobQuestions = selectedQuestions;
      userID = gon.user_id;

      payload["user_id"] = userID;
      payload["job_title"] = jobTitle;
      payload["city"] = jobCity;
      payload["state"] = jobState;
      payload["requirements"] = jobReqs;
      payload["question_id"] = jobQuestions;

      $.ajax({
      'type' : 'POST',
      'url': "/jobs/",
      'dataType' : 'JSON',
      'data': {job: payload},
      statusCode: {
               200: function (response) {
                      console.log(response);
                      alert('job creation successful');
                      window.location.replace("http://localhost:3030/step2/"+response.id);
                    },
               500: function (response) {
                alert('something went wrong :(');
               }
      }
    });
    }
  }

  selectTool.init();
};
  if ($('#collapseme').length > 0) {
  $('#collapseme').on('click', function() {
    fullH = document.getElementById("full-description").scrollHeight;
    var duration = 1000,
    easing = 'swing';
              if (140 == $('#full-description').height()) {
                  $('#full-description').animate(
                      {
                          'height' : fullH + 40
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
}

});
