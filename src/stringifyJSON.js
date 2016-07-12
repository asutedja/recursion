// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var result = '';
  var check = typeof obj;
  if (check === 'undefined' || check === 'symbol' || check === 'function') {// for undefined values
    result += 'undefined'; 
  } 
  else if (check === 'number' || check === 'boolean') { //for numbers or booleans
    result += obj;
  } 
  else if (check === 'string') { //for strings
    result = result + '"' + obj + '"';
  } 
  else if (check === 'object') {
    if(obj === null){//for null
      return 'null';
    }
    else if(Array.isArray(obj)){//for arrays
      result += '[';
      for(var i=0;i<obj.length;i++){
        result+= stringifyJSON(obj[i]);
        if(i !== obj.length - 1){
          result += ',';
        }
      }
    result += ']';
    }
  	else { //for objects
  	  result = result + '{';
  	  for (var key in obj) {

  	  	if (stringifyJSON(obj[key]) !== 'undefined') {
  	  	  result = result + '"' + key + '"' + ':' + stringifyJSON(obj[key]) + ',';
        }   
  	  }
  	  if (result[result.length-1] === ',') {
  	    result = result.slice(0,result.length-1);
  	  }
  	  result = result + '}';
      

    }
  }

  return result;

};