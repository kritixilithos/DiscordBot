"use strict";

let fs = require("fs");

let Discord    = require("discord.js");
let client     = new Discord.Client();
let clientUser;

let token   = fs.readFileSync("token.txt").toString().replace(/\n/g,"");
let botName;

let badWordsRaw = fs.readFileSync("bad_words.txt").toString().split("\n");
let badWordsRegExp;

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

	var badWords = [];

	for(var badWordRaw of badWordsRaw) {
		var splat = badWordRaw.split(" ");
		var badWord = "";
		for (var splatChar of splat) {
			badWord += String.fromCharCode(64+parseInt(splatChar));
		}
		badWords.push(badWord);
	}

	badWordsRegExp = new RegExp(badWords.join("|"), "i");
});

client.on("message", message => {
	console.log("Recieved: " + message.cleanContent);

	var channel = message.channel;

	//bot is pinged by @BotName
	if(badWordsRegExp.test(message.cleanContent)) {
		message.reply("Watch your profanity, *tsk* *tsk* *tsk*");
	} else if(/follow/ig.test(message.cleanContent)) {
		message.reply("No.");
	} else if(message.cleanContent.startsWith("@"+botName)) {
		var msg = message.cleanContent.split(/^@\w+ ?/)[1];
		YeeBot(channel, msg);
	}
});

// bot code
function YeeBot(channel, message) {
	var command = message.split(/ /)[0].toLowerCase();
	var args    = message.replace(/^[^ ]* /,"");
	var msg     = null;

	//command processing
	switch(command) {
		case "calc":
			console.log(calc.a);
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
		console.log("Said: "+msg+` [on ${channel}]`);
		channel.send(msg);
	}
}

client.login(token);
