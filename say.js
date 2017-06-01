"use strict";

module.exports = {
	say(message) {
		return new Promise((r,R) => r(message));
	}
}
