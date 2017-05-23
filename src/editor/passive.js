import CodeMirror from 'codemirror';
var syllable = require('syllable');
var passive = require('passive-voice');

export function addPassiveMode(simplemde){
  var passiveMode = {
          token: function (stream, state) {
            var text = "";
            while(!stream.eol() && stream.peek() != '.'){
              var char = stream.next();
              text = text + char;
            }
            if(text !== ""){
              return processSentence(stream, text);
            }
            stream.next();
          },
      };

  simplemde.codemirror.addOverlay(passiveMode);
};

function processSentence(stream, sentence){
  var result = passive(sentence);
  if(result.length != 0){
    var part = sentence.substring(result[0].index, result[0].index + result[0].offset);
/*
    console.log('vvvv start vvvv');
    console.log("sentence: " +  sentence);
    console.log(result);
    console.log("length : " + sentence.length);
    console.log("part : " + part);
    console.log('^^^^ end ^^^^');
*/
    if(result[0].index != 0){
      stream.backUp(sentence.length);
      stream.skipTo(part);
      return;
    }
    stream.eat(part);

//    console.log("current : " + stream.current());
    return "passive";
  }
}
