"use strict";

Handlebars.registerHelper('row', function(count, numColumns, options) {
    var result = '';
    var items = Array.from(Array(count).keys());

	for (var i = 0; i < items.length; i += numColumns) {
		result += options.fn({
		    columns: items.slice(i, i + numColumns)
		});
	}

	return result;
});