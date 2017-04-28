import CodeMirror from 'codemirror';

export function addReplaceMode(simplemde){
  var replaceMode = {
          token: function (stream, state) {
            var text = "";
            while(!stream.eol() && stream.peek() != '.'){
              var char = stream.next();
              text = text + char;
            }
            if(text == "replace"){
              return "replace";
            }
            stream.next();
          },
      };

  simplemde.codemirror.addOverlay(replaceMode);
};
