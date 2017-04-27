$(document).ready(function(){
    $("#signup-tab").click(function(e){
        $("#signup-tab").attr('class', 'col-6 vert-align signup-tab-active');
        $("#login-tab").attr('class', 'col-6 vert-align login-tab-inactive');
        $("#welcome-bar").html('<br /><span class="big-blue">START TODAY!</span><br />');
        $("#signup-form-box").attr('class', 'col-12 login-form-box');
        $("#login-form-box").attr('class', 'col-12 signup-form-box');
    });
    $("#signup-tab-text").click(function(e){
        $("#signup-tab").attr('class', 'col-6 vert-align signup-tab-active');
        $("#login-tab").attr('class', 'col-6 vert-align login-tab-inactive');
        $("#welcome-bar").html('<br /><span class="big-blue">START TODAY!</span><br />');
        $("#signup-form-box").attr('class', 'col-12 login-form-box');
        $("#login-form-box").attr('class', 'col-12 signup-form-box');
    });
    $("#login-tab").click(function(e){
        $("#login-tab").attr('class', 'col-6 vert-align login-tab-active');
        $("#signup-tab").attr('class', 'col-6 vert-align signup-tab-inactive');
        $("#welcome-bar").html('<br /><span class="big-blue">WELCOME BACK!</span><br />');
        $("#signup-form-box").attr('class', 'col-12 signup-form-box');
        $("#login-form-box").attr('class', 'col-12 login-form-box');
    });
    $("#login-tab-text").click(function(e){
        $("#login-tab").attr('class', 'col-6 vert-align login-tab-active');
        $("#signup-tab").attr('class', 'col-6 vert-align signup-tab-inactive');
        $("#welcome-bar").html('<br /><span class="big-blue">WELCOME BACK!</span><br />');
        $("#signup-form-box").attr('class', 'col-12 signup-form-box');
        $("#login-form-box").attr('class', 'col-12 login-form-box');
    });

});

$(document).ready(function(){
  $("form#login-box").bind ("ajax:success", function(e, data, status, xhr){
    window.location.replace("http://localhost:3030/dashboards/");
  }
  );
  $("form#login-box").bind ("ajax:error", function(e, data, status, xhr){
    sweetAlert("Oops...", "Please try again!", "error");
  }
  );
  $("form#signup-box").bind ("ajax:success", function(e, data, status, xhr){
   if (data.success) {
    //javascript that executes if everything goes o.k.;
    //location.reload();
    window.location.replace("http://localhost:3030/dashboards/");
  }
   else {
    sweetAlert("Oops...", "Please try again!", "error");
  }
  });
});
