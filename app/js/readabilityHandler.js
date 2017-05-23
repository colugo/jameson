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
    avgWords = Math.round(wordCount / numberOfSentences);
    addColour(score, avgWords);
  }
  else{
    score = "";
    wordCount = "";
    avgWords = "";
  }
  $('.readability').text(score);
  $('.wordCount').text(wordCount);
  $('.avgWords').text(avgWords);
}

function addColour(score, avgWords){
  if(avgWords <= 20)$('.avgWords').css('background-color','inherit');
  if(avgWords > 20)$('.avgWords').css('background-color','rgba(255, 255, 0, 0.15)');
  if(avgWords > 30)$('.avgWords').css('background-color','rgba(255, 0, 0, 0.15)');

  if(score <= 5)$('.readability').css('background-color','inherit');
  if(score > 8)$('.readability').css('background-color','rgba(249, 215, 0, 0.15)');
  if(score > 11)$('.readability').css('background-color','rgba(235, 164, 0, 0.15)');
  if(score > 14)$('.readability').css('background-color','rgba(220, 119, 0, 0.15)');
  if(score > 19)$('.readability').css('background-color','rgba(200, 79, 0, 0.15)');
  if(score > 21)$('.readability').css('background-color','rgba(255, 0, 0, 0.15)');
}
