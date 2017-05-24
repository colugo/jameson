import CodeMirror from 'codemirror';

export function addAdverbsMode(simplemde){
  var adverbMode = {
        token: function (stream, state) {
          stream.match(adverbsRegex);
          var phrase = stream.current();
          if(phrase.length > 0){
            return "adverb";
          }
          var ch = stream.next();
        }
      };

  simplemde.codemirror.addOverlay(adverbMode);
};
