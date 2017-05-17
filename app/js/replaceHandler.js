var jamesonEditor;
var plainEnglishReplacements;
var plainEnglishReplacementsRegex;

function replaceHandler(wordSpan, newWord) {

  var cursor = jamesonEditor.codemirror.getCursor();
  var span = $('#' + wordSpan);
  var containerPre = $('#' + wordSpan).closest("pre");
  var previous = span.prev();
  var next = span.next();

  var newBlock = previous.text() +  newWord + next.text();
  var oldBlock = previous.text() +  span.text() + next.text();

  //var text = containerPre.text().replace(/\u200B/g,'').replace($('#' + wordSpan).text(), newWord);
/*
  while(previous.length > 0){
    if(previous[0].style.display == "none"){
      previous = previous.prev();
      continue;
    }
    workingText = previous.text().replace(/\u200B/g,'');
    text = workingText + "\n" + text;
    previous = previous.prev();
  }
  var next = containerPre.next();
  while(next.length > 0){
    if(next[0].style.display == "none"){
      next = next.next();
      continue;
    }
    workingText = next.text();
    text = text + "\n" + workingText;
    next = next.next();
  }
*/



  var text = jamesonEditor.codemirror.getValue();
  text = text.replace(/\u200B/g,'');
  text = text.replace(oldBlock, newBlock);

  jamesonEditor.codemirror.setValue(text);
  jamesonEditor.codemirror.setCursor(cursor);
  jamesonEditor.codemirror.focus();
}


function setupReplaceHandler(){
  var wordToReplace= document.getElementsByClassName("cm-replace");
  if(wordToReplace.length > 0 ){
    Opentip.tips = [];
    for (var i = 0; i < wordToReplace.length; i++) {
        getId(wordToReplace[i]);
        var tip = new Opentip(wordToReplace[i], replaceTooltipContent(wordToReplace[i]) ,{ target: true, tipJoint: "bottom", targetJoint: "top", containInViewport: false, showOn: "mouseover", hideDelay: 1.5, removeElementsOnHide: true});
    }
  }
}

var replaceTooltipContent = function(wordSpan) {

  var word = wordSpan.innerText.toLowerCase();
  var html = "<ul>";
  for(var i = 0; i < plainEnglishReplacements[word].length; i ++){
    var option = plainEnglishReplacements[word][i];
    var li = "<li><a href='#' onclick=\"replaceHandler(\'" + wordSpan.id + "\', \'" + option + "\');\">" + option + "</a></li>";
    html = html + li;
  }
  html = html + "</ul>";
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
