
$(document).on('turbolinks:load', function(){
  $('#full-description').css({height:'200px', overflow:'hidden'});
  $('#collapseme').on('click', function() {
      var $this = $(this.previousElementSibling);
      if ($this.data('open')) {
          $('#full-description').switchClass("job-description", "job-description-full");
          $this.animate({height:'200px'});
          $this.data('open', 0);

      }
      else {
          $('#full-description').switchClass("job-description-full", "job-description");
          $this.animate({height:'100%'} );
          $this.data('open', 1);

      }
  });
});
