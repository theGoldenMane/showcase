$(document).ready(function () {
	$(".project").hover(
  		function() {
    		$(this).find( ".overview" ).hide();
    		$(this).find( ".description" ).show();
  		}, function() {
    		$(this).find( ".description" ).hide();
  			$(this).find( ".overview" ).show();
  		}
	);
});
