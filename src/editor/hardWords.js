import CodeMirror from 'codemirror';
var syllable = require('syllable');

export function addHardWordMode(simplemde){
  var hardWordMode = {
          token: function (stream, state) {
            stream.match(/\w+/);
            var text = stream.current();
            if(syllable(text) > 4) return "longWord";
            if(text.length > 12) return "longWord";
            stream.next();
          },
      };

  simplemde.codemirror.addOverlay(hardWordMode);
};
