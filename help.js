"use strict";

module.exports = {
	help(botName) {
		return `\`\`\`
Usage: @${botName} [command] [args]

Commands:
	die               kill the bot
	calc [args]       calculate [args] as a mathematical expression (WIP)
	say  [args]       make the bot say [args] as a text message
	[default]         display this help screen
\`\`\``;
	}
}
