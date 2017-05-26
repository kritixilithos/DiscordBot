"use strict";

module.exports = {
	blockify(message) {
		var numbers = "zero;one;two;three;four;five;six;seven;eight;nine".split(";");
		return message.toLowerCase().replace(/[a-z]/g, ":regional_indicator_$&:").replace(/\d/g, a=>`:${numbers[+a]}:`).replace(/ /g, ":white_large_square:");
	}
}
