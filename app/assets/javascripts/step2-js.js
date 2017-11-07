$(document).on('turbolinks:load', function(){
if ($('body').hasClass("jobs-step2")) {
    var publishButton = document.getElementById("publish")

    var step2Inputs = {
    init : function() {
      var that = this;

      publishButton.addEventListener('click', this.pushStep2Payload, false);

    },

    pushStep2Payload : function () {
      var payload = {};
      // user_id, company_name, job_title, city, state, job_description, requirements, question_id
      jobDesc = document.getElementById('description-input').innerText;
      jobQuals = document.getElementById('qualifications-input').innerText;
      jobID = document.getElementById('publish').dataset.jobid;
      userID = gon.user_id;

      payload["user_id"] = userID;
      payload["job_description"] = jobDesc;
      payload["qualifications"] = jobQuals;

      $.ajax({
      'type' : 'PATCH',
      'url': "/jobs/" + jobID,
      'dataType' : 'JSON',
      'data': {job: payload},
      statusCode: {
               200: function (response) {
                      console.log(response);
                      alert('job creation STEP 2 successful');
                      window.location.replace("http://localhost:3030/jobs/"+response.id);
                    },
               500: function (response) {
                alert('something went wrong :(');
               }
      }
    });
    }
  };

    step2Inputs.init();

};

});