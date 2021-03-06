
function setupPassvieHandler(){
  var wordToSuggest= document.getElementsByClassName("cm-passive");
  if(wordToSuggest.length > 0 ){
    Opentip.tips = [];
    for (var i = 0; i < wordToSuggest.length; i++) {
        getId(wordToSuggest[i]);
        var tip = new Opentip(wordToSuggest[i], passiveTooltip(wordToSuggest[i]) ,{ target: true, tipJoint: "bottom", targetJoint: "top", containInViewport: false, showOn: "mouseover", hideDelay: 1.5, removeElementsOnHide: true});
    }
  }
}

var passiveTooltip = function(wordSpan) {

  var word = wordSpan.innerText.toLowerCase();
  var html = "<p>Passive voice?</p>";
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
