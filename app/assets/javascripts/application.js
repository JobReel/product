// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require tether
//= require bootstrap-sprockets
//= require_tree .

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
