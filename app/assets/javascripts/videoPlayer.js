// Adapted from: https://code.tutsplus.com/tutorials/build-a-custom-html5-video-player--pre-8905
$(document).on('turbolinks:load', function(){
    // Boolean that allows us to "remember" the current size of the video player.
    var video = document.getElementsByTagName('video')[0],
    videoControls = document.getElementById('videoControls'),
    play = document.getElementById('play'),

    progressHolder = document.getElementById("progress_box"),
    playProgressBar = document.getElementById("play_progress"),
    volumebtn = document.getElementById("volumebtn"),
    volumebar = document.getElementById("volumebar"),
  	volumeslider = document.getElementById("volumeslider"),
  	section1Icon = document.getElementById("section1-icon"),
  	section2Icon = document.getElementById("section2-icon"),
  	section3Icon = document.getElementById("section3-icon"),
  	section4Icon = document.getElementById("section4-icon"),
  	section5Icon = document.getElementById("section5-icon"),
    isVideoFullScreen = false;

    var videoPlayer = {
      init : function() {
        // this is equal to the videoPlayer object.
        var that = this;

        // Helpful CSS trigger for JS.
        document.documentElement.className = 'js';

        // Get rid of the default controls, because we'll use our own.
        video.removeAttribute('controls');

        // When meta data is ready, show the controls
        video.addEventListener('loadeddata', this.initializeControls, false);

        // When play or pause buttons are pressed.
        this.handleButtonPresses();

        // Update the current time on timeupdate
        video.addEventListener('timeupdate', this.videoTime,false);

        // Show slider on volume mouseover
        volumebtn.addEventListener('mouseover', this.showVolume,false);
        volumebtn.addEventListener('mouseout', this.hideVolume,false);
        volumebar.addEventListener('mouseover', this.showVolume,false);
        volumebar.addEventListener('mouseout', this.hideVolume,false);

        // Mute cache volume
        volumebtn.addEventListener('click', this.muteVideo,false);

        // Adjust the volume with the slider
        volumeslider.addEventListener('change', this.setvolume,false);
        volumeslider.addEventListener('input', this.setvolume,false);

        // When the full screen button is pressed...
      	// fullScreenToggleButton.addEventListener("click", function(){
      	// 	isVideoFullScreen ? that.fullScreenOff() : that.fullScreenOn();
      	// }, true);
      },

      initializeControls : function() {
    		// When all meta information has loaded, show controls & perform other initial procedures (like adding section break icons)
        var durmins = Math.floor(gon.totalduration / 60);
        var dursecs = Math.floor(gon.totalduration - durmins * 60);
        if(dursecs < 10){ dursecs = "0"+dursecs; }
        durtimetext.innerHTML = durmins+":"+dursecs;
        section2Icon.style.left = 125 + 12 + (3.627 * gon.section1Duration) +"px";
        section2Icon.style.visibility = 'visible';
        section3Icon.style.left = section2Icon.offsetLeft + (3.627 * gon.section2Duration) +"px";
        section3Icon.style.visibility = 'visible';
        section4Icon.style.left = section3Icon.offsetLeft + (3.627 * gon.section3Duration) +"px";
        section4Icon.style.visibility = 'visible';
        section5Icon.style.left = section4Icon.offsetLeft + (3.627 * gon.section4Duration) +"px";
        section5Icon.style.visibility = 'visible';
        videoControls.style.opacity = 1;

    	},

      handleButtonPresses : function() {
    		// When the video or play button is clicked, play/pause the video.
    		video.addEventListener('click', this.playPause, false);
    		play.addEventListener('click', this.playPause, false);

        // When the play button is pressed,
      	// switch to the "Pause" symbol.
      	video.addEventListener('play', function() {
      		play.title = 'Pause';
          play.firstElementChild.src = "/assets/pause.gif";

      		// Begin tracking video's progress.
      		videoPlayer.trackPlayProgress();
      	}, false);


    		// When the video is paused,
    		// switch to the "Play" symbol and stop tracking progress.
        video.addEventListener('pause', function() {
      		play.title = 'Play';
          play.firstElementChild.src = "/assets/play.gif";

      		// Video was paused, stop tracking progress.
      		videoPlayer.stopTrackingPlayProgress();
      	}, false);


    		// When the video has concluded, pause it.
    		video.addEventListener('ended', function() {
    			this.currentTime = 0;
    			this.pause();
    		}, false);

        //Seek to the section when icon is clicked.
        section1Icon.addEventListener('click', function() {
          video.currentTime = 0;
          videoPlayer.updatePlayProgress();
        }, false);
        section2Icon.addEventListener('click', function() {
          video.currentTime = .30 + gon.section1Duration;
          videoPlayer.updatePlayProgress();
        }, false);
        section3Icon.addEventListener('click', function() {
          video.currentTime = video.currentTime = .30 + gon.section1Duration + gon.section2Duration;
          videoPlayer.updatePlayProgress();
        }, false);
        section4Icon.addEventListener('click', function() {
          video.currentTime = video.currentTime = .30 + gon.section1Duration + gon.section2Duration + gon.section3Duration;
          videoPlayer.updatePlayProgress();
        }, false);
        section5Icon.addEventListener('click', function() {
          video.currentTime = video.currentTime = .30 + gon.section1Duration + gon.section2Duration + gon.section3Duration + gon.section4Duration;
          videoPlayer.updatePlayProgress();
        }, false);

        // Video Scrubing function
        progressHolder.addEventListener("mousedown", function(){
          videoPlayer.stopTrackingPlayProgress();

          videoPlayer.playPause();

          document.onmousemove = function(e) {
            videoPlayer.setPlayProgress( e.pageX );
          }

          progressHolder.onmouseup = function(e) {
            document.onmouseup = null;
            document.onmousemove = null;


            videoPlayer.setPlayProgress( e.pageX );
            videoPlayer.trackPlayProgress();
          }
        }, true);


    	},

      // Every 10 milliseconds, update the play progress.
      trackPlayProgress : function(){
        (function progressTrack() {
           videoPlayer.updatePlayProgress();
           playProgressInterval = setTimeout(progressTrack, 10);
         })();
      },

      updatePlayProgress : function(){
    		playProgressBar.style.width = ( (video.currentTime / gon.totalduration) * (progressHolder.offsetWidth) ) + "px";
        if (playProgressBar.offsetWidth < section2Icon.offsetLeft - 125 - 13 & playProgressBar.offsetWidth > 0) {
          section1Icon.firstElementChild.src = "/assets/about-active-sm.gif";
        }
        if (playProgressBar.offsetWidth < section3Icon.offsetLeft - 125 - 13 & playProgressBar.offsetWidth > section2Icon.offsetLeft - 125 - 13) {
          section2Icon.firstElementChild.src = "/assets/challenge-active-sm.gif";
        }
        if (playProgressBar.offsetWidth < section4Icon.offsetLeft - 125 - 13 & playProgressBar.offsetWidth > section3Icon.offsetLeft - 125 - 13) {
          section3Icon.firstElementChild.src = "/assets/expectations-active-sm.gif";
        }
        if (playProgressBar.offsetWidth < section5Icon.offsetLeft - 125 - 13 & playProgressBar.offsetWidth > section4Icon.offsetLeft - 125 - 13) {
          section4Icon.firstElementChild.src = "/assets/team-active-sm.gif";
        }
        if (playProgressBar.offsetWidth > section5Icon.offsetLeft - 125 - 13) {
          section5Icon.firstElementChild.src = "/assets/perks-active-sm.gif";
        }
      },

      videoTime : function(){
        var curmins = Math.floor(video.currentTime / 60);
        var cursecs = Math.floor(video.currentTime - curmins * 60);
        var durmins = Math.floor(gon.totalduration / 60);
        var dursecs = Math.floor(gon.totalduration - durmins * 60);
        if(cursecs < 10){ cursecs = "0"+cursecs; }
        if(dursecs < 10){ dursecs = "0"+dursecs; }
        curtimetext.innerHTML = curmins+":"+cursecs;
        durtimetext.innerHTML = durmins+":"+dursecs;
      },

      playPause : function() {
    		if ( video.paused || video.ended ) {
    			if ( video.ended ) { video.currentTime = 0; }
    			video.play();
    		}
    		else { video.pause(); }
    	},

      showVolume : function() {
        volumebar.style.visibility = 'visible';
      },

      hideVolume : function() {
        volumebar.style.visibility = 'hidden';
      },

      setvolume : function() {
        video.volume = volumeslider.value / 100;
        if (video.volume < 0.002) {
          video.muted = true;
          volumebtn.firstElementChild.src = "/assets/mutebtn.gif";
        }
        else {
          video.muted = false;
          volumebtn.firstElementChild.src = "/assets/volumebtn.gif";
        }
      },

      muteVideo : function() {
          if(video.muted) {                     // User clicked 'Unmute'
              volumeslider.value = cachedVolume; // set volume to previous value
              video.muted = false;
              volumebtn.firstElementChild.src = "/assets/volumebtn.gif";
          }
          else { // User clicked 'Mute'
            cachedVolume = volumeslider.value;  // store value of volume in another variable
            video.muted = true;
            volumebtn.firstElementChild.src = "/assets/mutebtn.gif";
            volumeslider.value= 0;
          }
      },


      // fullScreenOn : function() {
      //   isVideoFullScreen = true;
      //
      //   // Set new width according to window width
      //   video.style.cssText = 'position: fixed; width:' + window.innerWidth + 'px; height: ' + window.innerHeight + 'px;';
      //
      //   // Apply a classname to the video and controls, if the designer needs it...
      //   video.className = 'fullsizeVideo';
      //   videoControls.className = 'fs-control';
      //   fullScreenToggleButton.className = "fs-active control";
      //
      //   // Listen for escape key. If pressed, close fullscreen.
      //   document.addEventListener('keydown', this.checkKeyCode, false);
      // },

      // fullScreenOff : function() {
      //   isVideoFullScreen = false;
      //
      //   video.style.position = 'static';
      //
      //   video.className = '';
      //   fullScreenToggleButton.className = "control";
      //   videoControls.className = '';
      // },

      // Determines if the escape key was pressed.
    	// checkKeyCode : function( e ) {
    	// 	e = e || window.event;
    	// 	if ( (e.keyCode || e.which) === 27 ) videoPlayer.fullScreenOff();
    	// },

      // Video was stopped, so stop updating progress.
    	stopTrackingPlayProgress : function(){
    		clearTimeout( playProgressInterval );
    	},

      setPlayProgress : function( clickX ) {
        var newPercent = Math.max( 0, Math.min(1, (clickX - this.findPosX(progressHolder)) / progressHolder.offsetWidth) );
        video.currentTime = newPercent * gon.totalduration;
        playProgressBar.style.width = newPercent * (progressHolder.offsetWidth)  + "px";
      },

      findPosX : function(progressHolder) {
        var curleft = progressHolder.offsetLeft;
        while( progressHolder = progressHolder.offsetParent ) {
          curleft += progressHolder.offsetLeft;
        }
        return curleft;
      }

    };

    videoPlayer.init();

});
