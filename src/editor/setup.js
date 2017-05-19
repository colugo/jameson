

import SimpleMDE from 'simplemde';


import {addSentenceMode} from './sentence';
import {addReplaceMode} from './replace';
import {addSuggestMode} from './suggest';
import {addHardWordMode} from './hardWords';

export const setup = () => {
  captureLanguageXHR();
  var simplemde = new SimpleMDE({
  	autofocus: true,
  	autosave: {
  		enabled: false,
  		uniqueId: "MyUniqueID",
  		delay: 1000,
  	},
  	blockStyles: {
  		bold: "__",
  		italic: "_"
  	},
  	element: document.getElementById("main_editor"),
  	forceSync: true,
  	hideIcons: ["fullscreen","table","code","side-by-side"],
  	indentWithTabs: false,
  	initialValue: "",
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
  	placeholder: "",

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
    //toolbar: false,
  	toolbarTips: true
  });
  addSentenceMode(simplemde);
  addReplaceMode(simplemde);
  addSuggestMode(simplemde);
  addHardWordMode(simplemde);

  simplemde.codemirror.on("update", function() {
    setupReplaceHandler();
    setupSuggestHandler();
    setupReadabilityHandler();
  });

  return simplemde;
};

function captureLanguageXHR(){
  (function(open) {

    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

        if(url == 'https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff'){
          url = 'https://gitcdn.xyz/cdn/colugo/jameson/master/lang/en_AU.aff';
        }
        if(url == 'https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic'){
          url = 'https://gitcdn.xyz/cdn/colugo/jameson/master/lang/en_AU.dic';
        }
        open.call(this, method, url, async, user, pass);
    };

  })(XMLHttpRequest.prototype.open);
}
