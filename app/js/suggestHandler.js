
var suggestions;
var suggestionsRegex;

function setupSuggestHandler(){
  var wordToSuggest= document.getElementsByClassName("cm-suggest");
  if(wordToSuggest.length > 0 ){
    Opentip.tips = [];
    for (var i = 0; i < wordToSuggest.length; i++) {
        getId(wordToSuggest[i]);
        var tip = new Opentip(wordToSuggest[i], suggestTooltip(wordToSuggest[i]) ,{ target: true, tipJoint: "bottom", targetJoint: "top", containInViewport: false, showOn: "mouseover", hideDelay: 1.5, removeElementsOnHide: true});
    }
  }
}

var suggestTooltip = function(wordSpan) {

  var word = wordSpan.innerText.toLowerCase();
  var html = "<p>";
  var suggestion;
  // find which suggestion regex matches.
  for(var regex in suggestions){
    if(word.match(regex)){
      suggestion = suggestions[regex][0];
      break;
    }
  }
  html = html + suggestion;

  html = html + "</p>";
  return document.createElement("span").html=html;
};

var getId = (function () {
  var incrementingId = 0;
  return function(element) {
    if (!element.id) {
      element.id = "id_" + incrementingId++;
    }
    return element.id;
  };
}());
