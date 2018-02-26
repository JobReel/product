
var activeSection = "";
var activeSaveSection = "";

// This sets the active jobreel to the default/profile jobreel.
function setDefaultJobreel() {
  $.get("/jobreels/").success( function( data ) {
    id = gon.user_id;
    item = data.find(result => result.job_id === null);
    activeJobreel = item;
  });

//   $.ajax({
//   type: "GET",
//   url: "/jobreels/",
//   data: {"job_id": "activeJob.job_id"},
//   success: function( data ) {
//       //code that executes when the data is retrieved
//   },
// });
};

// This sets the active jobreel to the selected jobreel from the dropdown. It updates all sections and the workspace

  function setActiveJobreel(e) {
    console.log(e);
    $.get("/jobreels/").success( function( data ) {
      id = e;
      item = data.find(result => result.id === id);
      console.log(item);
      activeJobreel = item;
       if (activeJobreel.job_id === null) {
        $('#section1_collapse').html("Introduction");
        $('#section2_collapse').html("Education");
        $('#section3_collapse').html("Work Experience");
        $('#section4_collapse').html("Hobbies");
        $('#section5_collapse').html("Recommendations");
       }
       else {
        $('#section1_collapse').html(activeJobreel.section1_title.toLowerCase());
        $('#section2_collapse').html(activeJobreel.section2_title.toLowerCase());
        $('#section3_collapse').html(activeJobreel.section3_title.toLowerCase());
        $('#section4_collapse').html(activeJobreel.section4_title.toLowerCase());
        $('#section5_collapse').html(activeJobreel.section5_title.toLowerCase());
        }
      $('#library-dropdown').html('Current Jobreel - ' + activeJobreel.job_title);
    });

  }


  function setActiveSection(e) {
    var sectionThumbnails = "";
    activeSaveSection = e.target.parentElement.id;
    activeSection = e.target.textContent;

    //Rewrites the video Selection Modal with videos from the library
    var sections2 = [];
    var sections2 = gon[activeSaveSection];
    $.each(sections2, function (index, clipID){
      var singleID = '<a href="#" onclick="selectVideo(this)"><img src="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_72,w_100/'+clipID.private_id+'.jpg" alt="'+clipID.private_id+'"></a>';
      sectionThumbnails += singleID;
      console.log(clipID);
    });

    console.log(sectionThumbnails);
    console.log(activeSection);
    $('#workspace-section').html(e.target.textContent);
    $('#videoStrip').html(sectionThumbnails);
    // sectionDuration = clipDurations.reduce((v, i) => (v + i));
  }

// Builds the drop-down of Jobreels for that user.
// This should also set the active jobreel to whichever is selected. Default profile?
  $(function() {
    $.get("/jobreels").success( function( data ) {
      var htmlString = "";
      console.log(data);
      $.each(data, function(index,  jobreel) {
        console.log(jobreel);
        var liElement = '<div id="jobreel-id-' +
        jobreel.id +
        '" onclick="setActiveJobreel(' + jobreel.id + ')"><span>Jobreel: ' +
        jobreel.job_title +
        '</span></div>';
        htmlString += liElement;
      });
      var ulJobreels = $('.dropdown-content');
      ulJobreels.html(htmlString);
    });
  });

// This grabs the public IDs of the selected videos and inserts the posters into the workspace
  var selectedVideos = [];
  function selectVideo(element){
    var publicID = element.childNodes[0].alt;
    var versionID = element.childNodes[0].src;
    var posterSrc = element.childNodes[0].src;
    console.log(publicID);
    selectedVideos.push(publicID);

    $('#insertion-point').append('<img src="'+posterSrc+'" width = "188" height = "104"></img>')
    $('#selectModal').modal('hide');
    event.preventDefault();
  }

// This builds a hash of clipIDs and durations then updates the current jobreel with the selectedVideos and sectionDuration for the appropriate section.
  function pushVideos(){

    var sections2 = [];
    var sections2 = gon[activeSaveSection];
    var clipDurations = {};
    $.each(sections2, function (index, clipID){
      clipDurations[clipID.private_id] = (clipID.duration);
    });

    alert('pushing next');
    var dataObj = {};
    var sectionDuration = 0;
    dataObj[activeSaveSection] = selectedVideos;
    $.each(selectedVideos, function (index, clipID) {
      sectionDuration += clipDurations[clipID];
    });
    activeSaveSectionDuration = activeSaveSection.slice(0,9) + 'duration';
    dataObj[activeSaveSectionDuration] = sectionDuration;
    $.ajax({
      'type' : 'POST',
      'method' : 'PATCH',
      'url': "/jobreels/" + activeJobreel.id,
      'dataType' : 'JSON',
      'data': {jobreel: dataObj},
      'success': function(response){
      alert('save successful')
      }
    });

    selectedVideos = [];
    $("#insertion-point").html("");
  }

  // $.post("/jobreels/" + activeJobreel.id, {
  //   _method: "PATCH",
  //   jobreel: {
  //     activeSaveSection: selectedVideos
  //   }
  // });


  // figure out success handler to update the various DOM elements


  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  function myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  // This controls the netflix-style scrolling div
  setInterval(function() {
      var left1 = parseInt($('#insertion-point').css('left'));

      if ($('#left1:hover').length) {
          $('#insertion-point').css('left', left1+2);
      }
      else if ($('#right1:hover').length) {
          $('#insertion-point').css('left', left1-2);
      }
  }, 10);


  // Checks if user is clicking to another section before saving their selected videos for the current sectionm
  function saveProgress(){
      if (selectedVideos.length > 0) {
        if (confirm("You haven't saved your work on this section yet. Would you like to save?")) {
          // Updates the database with the selectedVideos
          pushVideos();
        }
        else {
          // Clears the selectedVideos
          selectedVideos = [];
          sectionDuration = 0;
        }
      }
      else {
        // Do nothing
      }
  }



  // This controls the collapsing sections and the click handler for the push-button to update public IDs with selected videos

  // Spring Cleaning: move the document ready function back to the view, make a separate functions
function initializePage(){
      setDefaultJobreel();
      $("#section1_collapse").click(function(e){
          saveProgress();
          setActiveSection(e);
          $("#section1_hidden").show(400);
          $("#section2_hidden").hide(400);
          $("#section3_hidden").hide(400);
          $("#section4_hidden").hide(400);
          $("#section5_hidden").hide(400);
      });
      $("#section2_collapse").click(function(e){
          saveProgress();
          setActiveSection(e);
          $("#section2_hidden").show(400);
          $("#section3_hidden").hide(400);
          $("#section4_hidden").hide(400);
          $("#section5_hidden").hide(400);
          $("#section1_hidden").hide(400);
          //$("#edu_icon").attr('src', '/assets/edu-icon-active.png');
      });
      $("#section3_collapse").click(function(e){
          saveProgress();
          setActiveSection(e);
          $("#section3_hidden").show(400);
          $("#section4_hidden").hide(400);
          $("#section5_hidden").hide(400);
          $("#section1_hidden").hide(400);
          $("#section2_hidden").hide(400);
      });
      $("#section4_collapse").click(function(e){
          saveProgress();
          setActiveSection(e);
          $("#section4_hidden").show(400);
          $("#section5_hidden").hide(400);
          $("#section1_hidden").hide(400);
          $("#section2_hidden").hide(400);
          $("#section3_hidden").hide(400);
      });
      $("#section5_collapse").click(function(e){
          saveProgress();
          setActiveSection(e);
          $("#section5_hidden").show(400);
          $("#section1_hidden").hide(400);
          $("#section2_hidden").hide(400);
          $("#section3_hidden").hide(400);
          $("#section4_hidden").hide(400);
      });
      $('#push-button').click(function (event) {
          pushVideos();
          event.preventDefault();
      });
  }

  // This creates the html for the concatentated video from selectedVideos

  function previewVideoHTML(selectedVideos2) {
    var videoHTML = '<video controls="controls" poster="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_400,w_600/';
    videoHTML += selectedVideos2[0] + '.jpg">';

    var videoWebmHTML = '<source src="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_400,w_600/';

    $.each(selectedVideos2, function(index, clipID){
      if (index > 0) {
        var singleID = "c_fill,fl_splice,h_400,l_video:"+ selectedVideos2[index] +",w_600/";
        videoWebmHTML += singleID;
      };
    });
    videoWebmHTML += selectedVideos2[0] + '.webm" type="video/webm">';
    videoHTML += videoWebmHTML;

    var videoMp4HTML = '<source src="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_400,w_600/';

    $.each(selectedVideos2, function(index, clipID){
      if (index > 0) {
        var singleID = "c_fill,fl_splice,h_400,l_video:"+ selectedVideos2[index] +",w_600/";
        videoMp4HTML += singleID;
      };
    });
    videoMp4HTML += selectedVideos2[0] + '.mp4" type="video/mp4">';
    videoHTML += videoMp4HTML;

    var videoOggHTML = '<source src="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_400,w_600/';

    $.each(selectedVideos2, function(index, clipID){
      if (index > 0) {
        var singleID = "c_fill,fl_splice,h_400,l_video:"+ selectedVideos2[index] +",w_600/";
        videoOggHTML += singleID;
      };
    });
    videoOggHTML += selectedVideos2[0] + '.ogg" type="video/ogg"></video>';
    videoHTML += videoOggHTML;

    console.log(videoHTML);
    var previewPlayer = $('#previewModalPlayer');
    previewPlayer.html(videoHTML);
  };

  function buildVideoHTML(selectedVideos3) {
    var videoHTML = '<video controls="controls" poster="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_400,w_600/';
    videoHTML += selectedVideos3[0] + '.jpg">';

    var videoWebmHTML = '<source src="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_400,w_600/';

    $.each(selectedVideos3, function(index, clipID){
      if (index > 0) {
        var singleID = "c_fill,fl_splice,h_400,l_video:"+ selectedVideos3[index] +",w_600/";
        videoWebmHTML += singleID;
      };
    });
    videoWebmHTML += selectedVideos3[0] + '.webm" type="video/webm">';
    videoHTML += videoWebmHTML;

    var videoMp4HTML = '<source src="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_400,w_600/';

    $.each(selectedVideos3, function(index, clipID){
      if (index > 0) {
        var singleID = "c_fill,fl_splice,h_400,l_video:"+ selectedVideos3[index] +",w_600/";
        videoMp4HTML += singleID;
      };
    });
    videoMp4HTML += selectedVideos3[0] + '.mp4" type="video/mp4">';
    videoHTML += videoMp4HTML;

    var videoOggHTML = '<source src="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_400,w_600/';

    $.each(selectedVideos3, function(index, clipID){
      if (index > 0) {
        var singleID = "c_fill,fl_splice,h_400,l_video:"+ selectedVideos3[index] +",w_600/";
        videoOggHTML += singleID;
      };
    });
    videoOggHTML += selectedVideos3[0] + '.ogg" type="video/ogg"></video>';
    videoHTML += videoOggHTML;

    console.log(videoHTML);
    var jobreelPlayer = $('#video_target');
    jobreelPlayer.html(videoHTML);
  };
