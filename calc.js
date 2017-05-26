"use strict";

module.exports = {
	calc(expression) {
		expression = expression.replace(/^`(.+)`$/, "$1");
		return expression;
	}
}
