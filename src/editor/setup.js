

import SimpleMDE from 'simplemde';


import {addSentenceMode} from './sentence';
import {addReplaceMode} from './replace';
import {addHardWordMode} from './hardWords';

export const setup = () => {
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
  	hideIcons: ["heading","fullscreen","table","code"],
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
  	toolbarTips: true
  });
  addSentenceMode(simplemde);
  addReplaceMode(simplemde);
  addHardWordMode(simplemde);

  simplemde.codemirror.on("update", function() {
    setupReplaceHandler();
    setupReadabilityHandler();
  });

  return simplemde;
};
