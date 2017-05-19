
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
  console.log("suggestion: " + word);
  html = html + suggestions[word][0];
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
