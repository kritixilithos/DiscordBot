"use strict";

function Calculator() {
	this.ans = 0;
	this.calculate = function(expression) {
		this.ans = expression; //TODO: calculate the expression
		return this.ans;
	}
}

var CalculatorMain = new Calculator();

module.exports = {
	calc(expression) {
		console.log(CalculatorMain.ans);
		return CalculatorMain.calculate(expression);
	}
}

function Lexer(expression) {
	this.tokens = [];
	this.lex = function() {
	}
}
