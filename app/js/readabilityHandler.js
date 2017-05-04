var syllable = require('syllable');

function setupReadabilityHandler(){
  var workingText = jamesonEditor.codemirror.getValue().replace(/\.+/g,".");
  var numberOfSentences = (workingText.match(/\./g) || []).length;
  if(numberOfSentences == 0){
    numberOfSentences = 1;
  }
  var wordCount = $('.words').text();

  if(wordCount > 0){
    var syllables = syllable(workingText);
    var score = 0.39 * (wordCount / numberOfSentences) + 11.8 * (syllables / wordCount) - 15.59;
    score = score.toFixed();
  }
  else{
    score = "";
    wordCount = "";
  }
  $('.readability').text(score);
  $('.wordCount').text(wordCount);
}
