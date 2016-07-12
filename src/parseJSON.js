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
    while (char && char <= ' '){// would like to know why <= over ===
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

var a =     '{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'
console.log(JSON.parse(a));
console.log("Ours")
console.log(parseJSON(a));
/*var b = JSON.parse(a);
var c = parseJSON(a);
if (b === c){
  console.log('correct');
}*/
