var syllable = require('syllable');

function setupReadabilityHandler(){
  var workingText = jamesonEditor.codemirror.getValue().replace(/\.+/g,".");
  var numberOfSentences = (workingText.match(/\./g) || []).length;
  if(numberOfSentences == 0){
    numberOfSentences = 1;
  }
  var wordCount = $('.words').text();
  if(wordCount == 0){
    wordCount = 1;
  }
  var syllables = syllable(workingText);
/*
  var score = 206.835 - 1.015 * (wordCount / numberOfSentences) - 84.6 * (syllables / wordCount)


  var grade = "College Graduate";
  if(score > 30) grage = "College";
  if(score > 50) grade =  "10th to 12th";
  if(score > 60) grade = "8th & 9th";
  if(score > 70) grade = "7th";
  if(score > 80) grade = "6th";
  if(score > 90) grade = "5th";

  console.log("Reading level = " + grade);
  */
  var score = 0.39 * (wordCount / numberOfSentences) + 11.8 * (syllables / wordCount) - 15.59;
  if(score < 0) score = "-";
  console.log("Reading grade = " + score);
  $('.readability').text(score.toFixed());
  $('.wordCount').text(wordCount);
}
