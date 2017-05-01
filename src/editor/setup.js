

import SimpleMDE from 'simplemde';

import {addSentenceMode} from './sentence';
import {addReplaceMode} from './replace';

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
  addSentenceMode(simplemde);
  addReplaceMode(simplemde);

  simplemde.codemirror.on("change", function() {

    var wordToReplace= document.getElementsByClassName("cm-replace");

    for (var i = 0; i < wordToReplace.length; i++) {
        getId(wordToReplace[i]);
        new Opentip(wordToReplace[i], replaceTooltipContent(wordToReplace[i]) ,{ target: true, tipJoint: "bottom", targetJoint: "top", containInViewport: false, showOn: "mouseenter", hideDelay: 1.5});
    }
  });
  return simplemde;
};

var replaceTooltipContent = function(wordSpan) {
  return document.createElement("span").html="<ul><li><a href='#'>simpler</a></li><li><a href='#'>clearer</a></li><li><a href='#' onclick=\"replaceHandler(\'" + wordSpan.id + "\', \'faster\');\">faster</a></li></ul>";
};

var getId = (function () {
  var incrementingId = 0;
  return function(element) {
    if (!element.id) {
      element.id = "id_" + incrementingId++;
    }
    return element.id;
  };
}());
