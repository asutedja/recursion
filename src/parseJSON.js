// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var pos;
  var char;
  //function used to go to next character in json
  var next = function(){
  	pos += 1;
  	char = json.charAt(at);
  	return char;
  };
  //function used to determine what type of value/collection it is.  
  var result = function(){
  	if(char && char >=0 && char <=9 || char === '-'){
  		return number();
  	}
  	else if(char === '['){
  		return array();
  	}
  	else if(char === '{'){
  		return object();
  	}
  	else if(char === '\"'){
  		return string();
  	}
  	else if (char === 't' || char === 'f' || char === 'n'){
  		return boolean();
  	}
  }

  //function used to determine which boolean or if null
  var boolean = function(){
  	var bool = '';
  	if(char === 't'){
  		for(var i = 0;i<4;i++){
  			bool += char;
  			next();
  		}
  		if(bool === 'true'){
  			return true;
  		}
  	}
   	else if(char === 'f'){
  		for(var i = 0;i<5;i++){
  			bool += char;
  			next();
  		}
  		if(bool === 'false'){
  			return false;
  		}
  	}
  	else if(char === 'n'){
  		for(var i = 0;i<4;i++){
  			bool += char;
  			next();
  		}
  		if(bool === 'null'){
  			return null;
  		}
  	}
  }

  var number = function() {
  	
  }


  // your code goes here
};
