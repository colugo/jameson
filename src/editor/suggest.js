import CodeMirror from 'codemirror';

export function addSuggestMode(simplemde){
  var suggestMode = {
        token: function (stream, state) {
          stream.match(suggestionsRegex);
          var phrase = stream.current();
          if(phrase.length > 0){
            return "suggest";
          }
          var ch = stream.next();
        }
      };

  simplemde.codemirror.addOverlay(suggestMode);
};
