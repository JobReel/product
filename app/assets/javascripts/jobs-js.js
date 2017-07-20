
$(document).on('turbolinks:load', function(){
  $('#full-description').css({height:'20px', overflow:'hidden'});
  $('#collapseme').on('click', function() {
      var $this = $(this.previousElementSibling);
      if ($this.data('open')) {
          $this.animate({height:'20px'}, "slow" );
          $this.data('open', 0);

      }
      else {
          $this.animate({height:'100%'}, "slow" );
          $this.data('open', 1);
      }
  });
});
