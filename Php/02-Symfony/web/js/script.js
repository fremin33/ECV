$(function () {
	// SORT BY POSITION
	$("#sortable").sortable({
		start: function (event, ui) {
			var start_position = ui.item.index();
			ui.item.data('start_position', start_position);
		},
		update: function (event, ui) {
			let movement = ui.position.top - ui.originalPosition.top > 0 ? "down" : "up";
			let url = ui.item.data('url');
			let end_position = ui.item.index();
			let start_position = ui.item.data('start_position');
			$.ajax({
				type: "POST",
				url: url,
				data: {
					end_position: end_position,
					start_position: start_position,
					movement: movement
				},
				dataType: "json",
				success: function (response) {}
			});
		}
	});
});