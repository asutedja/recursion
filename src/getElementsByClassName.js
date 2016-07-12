// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
//Reading up on what an Element and a Node is and what methods are available is important.
var getElementsByClassName = function(className) {
	var doc=document;
	var elements = [];
	var recur = function(node,func){
		func(node);
		node = node.firstChild;
		while(node){
			recur(node,func);
			node = node.nextSibling
		}
	}
	recur(doc, function(node){
		if(node.classList && node.classList.contains(className)){
			elements.push(node)
		}
	});
	return elements;
};
