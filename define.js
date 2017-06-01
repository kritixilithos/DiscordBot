"use strict";

let rp = require('request-promise')
let Discord = require("discord.js");

function errorEmbed() {
	var embed = new Discord.RichEmbed();
	embed.setTitle("Error");
	embed.setColor([255, 0, 0]);
	return embed;
}

module.exports = {
	async define(word) {
		return new Promise((r,R) => {
			var read = rp("https://api.datamuse.com/words?sp="+word+"&md=d");
			read.then((wordsData) => {
				var json = JSON.parse(wordsData);
				var selectedWord;
				console.log(json);
				if(json.length < 1) {
					R(errorEmbed());
				} else {
					var index = 0;
					var errored = false;
					console.log(json[index].defs+"" === "undefined");
					while(json[index].defs+"" === "undefined") {
						if((++index) >= json.length) {
							errored = true;
							break;
						}
					}
					if (errored) {
						R(errorEmbed());
					} else {
						selectedWord = json[index];
						var embed = new Discord.RichEmbed()
							.setTitle(selectedWord.word)
							.setDescription(selectedWord.defs.join("\n"))
							.setColor([0, 0, 255])
							.setURL("http://wordnetweb.princeton.edu/perl/webwn?s="+selectedWord.word.replace(/ /g,"%20"));
						r(embed);
					}
				}
			});
		});
	}
}
