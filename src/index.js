module.exports = function check(str, bracketsConfig) {
	if(!checkProperBrackets(str, bracketsConfig)) return false;

	var inputCharacters = str.split('');
	var stack = [];
	var currentCharacter = '';
	var stackTopCharacter = '';

	for(var i=0; i<inputCharacters.length; i++){
		currentCharacter = inputCharacters[i];
		stackTopCharacter = stack[stack.length-1];

		if(isOpening(currentCharacter, bracketsConfig)){
			if(isClosing(currentCharacter, bracketsConfig, stackTopCharacter)) {
				stack.pop();
			}
			else {
				stack.push(currentCharacter);
			}
		} else if (isClosing(currentCharacter, bracketsConfig, stackTopCharacter)){
			stack.pop();
		} else {
			return false;
		}
	}
	if(stack.length == 0) return true;
	return false;
}

function checkProperBrackets(str, bracketsConfig){
	var providedBrackets = '';

	for(var i=0; i<bracketsConfig.length; i++){
		if(isDigit(bracketsConfig[i])){
			providedBrackets +=  bracketsConfig[i].join('');
		} else {
			providedBrackets +=  escapeChar(bracketsConfig[i].join('\\'));
		}
	}

	if(str.replace(RegExp('[' + providedBrackets + ']+'), '').length > 1) return false;
	return true;
}

function isOpening(character, bracketsConfig){
	for(var i=0; i<bracketsConfig.length; i++){
		if(character == bracketsConfig[i][0]){
			return true;
		}
	}
	return false;
}

function isClosing(character, bracketsConfig, lastStackElement){

	for(var i=0; i<bracketsConfig.length; i++){
		if(character == bracketsConfig[i][1]){
			if(lastStackElement == bracketsConfig[i][0]){
				return true;
			}
		}
	}
	return false;
}

function escapeChar(character){
	return '\\' + character;
}

function isDigit(character){
	return RegExp('[0-9]').test(character);
}