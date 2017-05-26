"use strict";

module.exports = {
	die() {
		var msg = "Process killed";
		console.log(msg);
		process.exit();
	}
}
