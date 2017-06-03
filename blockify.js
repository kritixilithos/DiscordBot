"use strict";

module.exports = {
	blockify(message) {
		//TODO: golf this
		var numbers = "zero;one;two;three;four;five;six;seven;eight;nine".split(";");
		return new Promise((r,R) => r(message.toLowerCase().replace(/[a-z]/g, ":regional_indicator_$&:").replace(/\d/g, a=>`:${numbers[+a]}:`).replace(/ /g, ":white_large_square:")));
	}
}
