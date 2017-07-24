
$(document).on('turbolinks:load', function(){
  $('#full-description').css({height:'100px', overflow:'hidden'});
  $('#collapseme').on('click', function() {
      var $this = $(this.previousElementSibling);
      if ($this.data('open')) {
          $this.animate({height:'100px'});
          $this.data('open', 0);
          $('#full-description').switchClass("job-description", "job-description-full");

      }
      else {
          $this.animate({height:'100%'} );
          $this.data('open', 1);
          $('#full-description').switchClass("job-description-full", "job-description");

      }
  });
});
