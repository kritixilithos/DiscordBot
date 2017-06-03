"use strict";

let rp = require('request-promise')
let Discord = require("discord.js");

//embed for when the word does not turn up any results
function errorEmbed() {
	var embed = new Discord.RichEmbed();
	embed.setTitle("Error");
	embed.setColor([255, 0, 0]);
	return embed;
}

module.exports = {
	async define(word) {
		return new Promise((r,R) => {
			//use the datamuse api to get the definition, using spelling ("?sp") as the query
			var read = rp("https://api.datamuse.com/words?sp="+word+"&md=d");
			read.then((wordsData) => {
				var json = JSON.parse(wordsData);
				var selectedWord;
				console.log(json);

				if(json.length < 1) {
				//if no results turned up
					R(errorEmbed());
				} else {
					var index = 0;
					var errored = false;
					console.log(json[index].defs+"" === "undefined");
					//search for a word in the json that has a definition
					while(json[index].defs+"" === "undefined") {
						if((++index) >= json.length) {
							errored = true;
							break;
						}
					}

					if (errored) {
						//none of the words in the json have a definition
						R(errorEmbed());
					} else {
						//success!
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
