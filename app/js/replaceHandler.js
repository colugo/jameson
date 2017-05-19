var jamesonEditor;
var plainEnglishReplacements;
var plainEnglishReplacementsRegex;


function replaceHandler(wordSpan, newWord) {

  var cursor = jamesonEditor.codemirror.getCursor();
  var scrollY =  jamesonEditor.codemirror.getScrollInfo().top;
  var span = $('#' + wordSpan);
  var containerPre = $('#' + wordSpan).closest("pre");
  var oldBlock = containerPre.text();
  // Removing the class stops the onChange event from failing on this span
  // because the word isn't a plainEnglishWord anymore
  span.removeClass("cm-replace");
  span.text(newWord);
  var newBlock = containerPre.text();

  var text = jamesonEditor.codemirror.getValue();
  text = text.replace(/\u200B/g,'');
  text = text.replace(oldBlock, newBlock);

  jamesonEditor.codemirror.setValue(text);
  jamesonEditor.codemirror.setCursor(cursor);
  jamesonEditor.codemirror.scrollTo(null,scrollY);
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
  if(plainEnglishReplacements[word] == undefined){
    // This happens when I change the text of the span
    console.log("undefined word : " + word);
  }
  var html = "<ul>";
  for(var i = 0; i < plainEnglishReplacements[word][0].length; i ++){
    var option = plainEnglishReplacements[word][0][i];
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
