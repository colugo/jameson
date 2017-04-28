import SimpleMDE from 'simplemde';
import CodeMirror from 'codemirror';
//var CodeMirror = require("codemirror");

export const setup = () => {
  var simplemde = new SimpleMDE({
  	autofocus: true,
  	autosave: {
  		enabled: true,
  		uniqueId: "MyUniqueID",
  		delay: 1000,
  	},
  	blockStyles: {
  		bold: "__",
  		italic: "_"
  	},
  	element: document.getElementById("main_editor"),
  	forceSync: true,
  	hideIcons: ["heading","fullscreen","table","code"],
  	indentWithTabs: false,
  	initialValue: "Hello world!",
  	insertTexts: {
  		horizontalRule: ["", "\n\n-----\n\n"],
  		image: ["![](http://", ")"],
  		link: ["[", "](http://)"],
  		table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
  	},
  	lineWrapping: true,
  	parsingConfig: {
  		allowAtxHeaderWithoutSpace: true,
  		strikethrough: false,
  		underscoresBreakWords: true,
  	},
  	placeholder: "Type here...",

  	promptURLs: true,
  	renderingConfig: {
  		singleLineBreaks: false,
  		codeSyntaxHighlighting: false,
  	},
  	shortcuts: {
  		drawTable: "Cmd-Alt-T"
  	},
  	showIcons: ["code", "table"],
  	spellChecker: true,
  	status: ["words"],
  	styleSelectedText: false,
  	tabSize: 4,
  	toolbarTips: true
  });
  addMode(simplemde);
  return simplemde;
};

function addMode(simplemde){
  var indentGuidesOverlay = {
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

  simplemde.codemirror.addOverlay(indentGuidesOverlay);

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
  var words = wordsFromSentence(sentence);
  if(words.length > 25){
    return true;
  }
  if(howManyLetters(sentence) > 99){
    return true;
  }
}

function sentenceIsHard(sentence){
  var words = wordsFromSentence(sentence);
  if(words.length > 35){
    return true;
  }
  if(howManyLetters(sentence) > 138){
    return true;
  }
}
