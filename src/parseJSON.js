// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var pos;
  var char;
  //function used to go to next character in json
  var next = function(){
    pos += 1;
    char = json.charAt(pos);
    return char;
  };
  var white = function(){
    if (char && char === ' '){
      next();
    }
  };
  //function used to determine what type of value/collection it is.  
  var result = function(){
    white();
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
    var num  = '';
    if(char === '-'){
      num = '-';
      next();
    }

    while(char && char >=0 && char <=9){
      num += char;
      next();
    }

        if (char === ".") {
            num += ".";
            while (next() && char >= "0" && char <= "9") {
                num += char;
            }
        }
    return +num;

  }
  var weird = {
        "\"": "\"",
        "\\": "\\",
        "/": "/",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "\t"
    };

  var string = function(){
    var str = '';
    if(char === '\"'){
      while(next()){
        if(char === '\"'){
          next();
          return str;
        }
        // Accounts for weird \ cases like \\\ which is really \
        if(char === '\\'){
          next();
          if(typeof weird[char] === 'string'){
            str += weird[char];
          }
        }
        else{
          str += char;
        }
      }
    }
  }

 var array = function(){
    var arr = [];
    if(char === '['){
      next();
      white();
      if(char === ']'){
        next();
        return arr;
      }

      while(char){
        arr.push(result());
        white();
        if(char === ']'){
          next();
          return arr;
        }
        next();
        white();
      }
    }
  } 

  var object = function() {
    var obj = {};
    if(char === '{'){
      next();
      white();
      if (char === '}'){
        next();
        return obj;
      }
    }
    while(char){
      var key = string();
      console.log(key);
      white();
      next();
      obj[key] = result();
      white();
      if(char === '}'){
        next();
      return obj;
      }
      next();
      white(); 
    }

  }

  pos = 0;
  char = json.charAt(pos);
  return result();
};

var a =     '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
    '25, "address" : { "streetAddress": "21 2nd Street", ' +
    '"city" : "New York", "state" : "NY", "postalCode" : ' +
    ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
    '"number": "212 555-1234" }, { "type" : "fax", ' +
    '"number": "646 555-4567" } ] }'
console.log(JSON.parse(a));
console.log("Ours")
console.log(parseJSON(a));
/*var b = JSON.parse(a);
var c = parseJSON(a);
if (b === c){
  console.log('correct');
}*/
