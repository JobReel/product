// Adapted from: https://code.tutsplus.com/tutorials/build-a-custom-html5-video-player--pre-8905
$(document).on('turbolinks:load', function(){
    // Boolean that allows us to "remember" the current size of the video player.
    var video = document.getElementsByTagName('video')[0],
    videoControls = document.getElementById('videoControls'),
    play = document.getElementById('play'),

    progressContainer = document.getElementById("progress"),
    progressHolder = document.getElementById("progress_box"),
    playProgressBar = document.getElementById("play_progress"),

    fullScreenToggleButton = document.getElementById("fullScreen"),
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

        // When the full screen button is pressed...
      	fullScreenToggleButton.addEventListener("click", function(){
      		isVideoFullScreen ? that.fullScreenOff() : that.fullScreenOn();
      	}, true);
      },

      initializeControls : function() {
    		// When all meta information has loaded, show controls & perform other initial procedures (like adding section break icons)
    		videoPlayer.showHideControls();
    	},

      showHideControls : function() {
    		// Shows and hides the video player.
    		video.addEventListener('mouseover', function() {
    			videoControls.style.opacity = 1;
    		}, false);

    		videoControls.addEventListener('mouseover', function() {
    			videoControls.style.opacity = 1;
    		}, false);

    		video.addEventListener('mouseout', function() {
    			videoControls.style.opacity = 0;
    		}, false);

    		videoControls.addEventListener('mouseout', function() {
    			videoControls.style.opacity = 0;
    		}, false);
    	},

      handleButtonPresses : function() {
    		// When the video or play button is clicked, play/pause the video.
    		video.addEventListener('click', this.playPause, false);
    		play.addEventListener('click', this.playPause, false);

        // When the play button is pressed,
      	// switch to the "Pause" symbol.
      	video.addEventListener('play', function() {
      		play.title = 'Pause';
      		play.innerHTML = '<span id="pauseButton">&#x2590;&#x2590;</span>';

      		// Begin tracking video's progress.
      		videoPlayer.trackPlayProgress();
      	}, false);


    		// When the video is paused,
    		// switch to the "Play" symbol and stop tracking progress.
        video.addEventListener('pause', function() {
      		play.title = 'Play';
      		play.innerHTML = '&#x25BA;';

      		// Video was paused, stop tracking progress.
      		videoPlayer.stopTrackingPlayProgress();
      	}, false);


    		// When the video has concluded, pause it.
    		video.addEventListener('ended', function() {
    			this.currentTime = 0;
    			this.pause();
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

      // Every 50 milliseconds, update the play progress.
      trackPlayProgress : function(){
        (function progressTrack() {
           videoPlayer.updatePlayProgress();
           playProgressInterval = setTimeout(progressTrack, 10);
         })();
      },

      updatePlayProgress : function(){
    		playProgressBar.style.width = ( (video.currentTime / video.duration) * (progressHolder.offsetWidth) ) + "px";
    	},

      playPause: function() {
    		if ( video.paused || video.ended ) {
    			if ( video.ended ) { video.currentTime = 0; }
    			video.play();
    		}
    		else { video.pause(); }
    	},

      fullScreenOn : function() {
        isVideoFullScreen = true;

        // Set new width according to window width
        video.style.cssText = 'position: fixed; width:' + window.innerWidth + 'px; height: ' + window.innerHeight + 'px;';

        // Apply a classname to the video and controls, if the designer needs it...
        video.className = 'fullsizeVideo';
        videoControls.className = 'fs-control';
        fullScreenToggleButton.className = "fs-active control";

        // Listen for escape key. If pressed, close fullscreen.
        document.addEventListener('keydown', this.checkKeyCode, false);
      },

      fullScreenOff : function() {
        isVideoFullScreen = false;

        video.style.position = 'static';

        video.className = '';
        fullScreenToggleButton.className = "control";
        videoControls.className = '';
      },

      // Determines if the escape key was pressed.
    	checkKeyCode : function( e ) {
    		e = e || window.event;
    		if ( (e.keyCode || e.which) === 27 ) videoPlayer.fullScreenOff();
    	},

      // Video was stopped, so stop updating progress.
    	stopTrackingPlayProgress : function(){
    		clearTimeout( playProgressInterval );
    	},

      setPlayProgress : function( clickX ) {
        var newPercent = Math.max( 0, Math.min(1, (clickX - this.findPosX(progressHolder)) / progressHolder.offsetWidth) );
        video.currentTime = newPercent * video.duration;
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
