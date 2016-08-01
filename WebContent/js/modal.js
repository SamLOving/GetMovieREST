$("#myCarousel").on('slide.bs.carousel', function(evt) {
	var id = $(evt.relatedTarget).index();
	console.debug("slide transition started")
	console.debug('current slide = ', $(this).find('.active').index())
	console.debug('next slide = ', $(evt.relatedTarget).index())

	document.getElementById("peliculaInfo").value = id;
})

$(document).ready(function() {
	// Show the Modal on load
	$("#myModal").modal("show");

	// Hide the Modal
	$("#myBtn").click(function() {
		$("#myModal").modal("hide");
	});
});

