import CodeMirror from 'codemirror';

export function addReplaceMode(simplemde){
  var replaceMode = {
        token: function (stream, state) {
          /*
          stream.eatWhile(/\w+/);
          console.log(stream.current());
          var ch = stream.next();
          var cur = stream.current();
          if (plainEnglishReplacementsKeywords.propertyIsEnumerable(cur)) return "replace";
          */
          stream.match(plainEnglishReplacementsRegex);
          var phrase = stream.current();
          if(phrase.length > 0){
            return "replace";
          }
          var ch = stream.next();
        }
      };

  simplemde.codemirror.addOverlay(replaceMode);
};
