import CodeMirror from 'codemirror';
var syllable = require('syllable');

export function addSentenceMode(simplemde){
  var sentenceMode = {
          token: function (stream, state) {
            var text = "";
            while(!stream.eol() && stream.peek() != '.'){
              var char = stream.next();
              text = text + char;
            }
            if(text !== ""){
              return processSentence(text);
            }
            stream.next();
          },
      };

  simplemde.codemirror.addOverlay(sentenceMode);
};

function wordsFromSentence(sentence){
  return sentence.split(/\s+/);
}

function howManyLetters(sentence){
  return sentence.replace(/\s+/g, '').length;
}

function processSentence(sentence){
  if(sentenceIsHard(sentence)) return "hard";
  if(sentenceIsMedium(sentence)) return "medium";
}

function sentenceIsMedium(sentence){
  /*
  var words = wordsFromSentence(sentence);
  if(words.length > 25){
    return true;
  }
  if(howManyLetters(sentence) > 99){
    return true;
  }*/
  if(syllable(sentence) > 30) return true;
}

function sentenceIsHard(sentence){
  /*
  var words = wordsFromSentence(sentence);
  if(words.length > 35){
    return true;
  }
  if(howManyLetters(sentence) > 138){
    return true;
  }*/
  if(syllable(sentence) > 35) return true;
}
