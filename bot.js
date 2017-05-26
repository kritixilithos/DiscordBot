"use strict";

let fs = require("fs");

let Discord    = require("discord.js");
let client     = new Discord.Client();
let clientUser;

let token   = fs.readFileSync("token.txt").toString().replace(/\n/g,"");
let botName;

var channel = null;

let calc     = require("./calc.js");
let blockify = require("./blockify.js");
let die      = require("./die.js");
let help     = require("./help.js");
let say      = require("./say.js");

client.on("ready", () => {
	console.log("Started.");
	clientUser = client.user;
	botName = clientUser.username;
	clientUser.setGame("in BotTown");
});

client.on("message", message => {
	console.log("Recieved: " + message.cleanContent);

	if(channel == null) channel = message.channel;

	//bot is pinged by @BotName
	if(message.cleanContent.startsWith("@"+botName)) {
		var msg = message.cleanContent.split(/^@\w+ ?/)[1];
		YeeBot(msg);
	}
});

// bot code
function YeeBot(message) {
	var command = message.split(/ /)[0].toLowerCase();
	var args    = message.replace(/^[^ ]* /,"");
	var msg     = null;

	//command processing
	switch(command) {
		case "calc":
			msg = calc.calc(args);
			break;
		case "blockify":
			msg = blockify.blockify(args);
			break;
		case "die":
			die.die();
			break;
		case "say":
			msg = say.say(args);
			break;
		default:
			msg = help.help(botName);
	}

	if(msg !== null) {
		console.log("Said: "+msg);
		channel.send(msg);
	}
}

client.login(token);
