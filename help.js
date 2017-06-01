"use strict";

module.exports = {
	help(botName) {
		return new Promise((r,R) => r(`\`\`\`
Usage: @${botName} [command] [args]
       .[command] [args]

Commands:
	die               kill the bot
	define [args]     get the definition of [args] using datamuse.com/api
	blockify [args]   emojify letters and numbers
	calc [args]       calculate [args] as a mathematical expression (WIP)
	pause             prevent the bot from sending any messages for 10
	                  seconds
	say [args]        make the bot say [args] as a text message
	update            update the list of bad words
	[default]         display this help screen
\`\`\``));
	}
}
