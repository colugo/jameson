var jamesonEditor;

function replaceHandler(wordSpan, newWord) {

  var cursor = jamesonEditor.codemirror.getCursor();
  //$('#id_7').closest("pre").prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().text()

  var containerPre = $('#' + wordSpan).closest("pre");
  var previous = containerPre.prev();
  var text = newWord;
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

  text = text.replace(/\u200B/g,'');
  console.log(text);
  //alert($('#' + wordSpan).text() + ": -> " + newWord );
  //$('#' + wordSpan).text(newWord)

  jamesonEditor.codemirror.setValue(text);
  jamesonEditor.codemirror.setCursor(cursor);
}
