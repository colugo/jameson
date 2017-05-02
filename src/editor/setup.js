

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

  simplemde.codemirror.on("update", function() {

    var wordToReplace= document.getElementsByClassName("cm-replace");

    if(wordToReplace.length > 0 ){

      Opentip.tips = [];

      for (var i = 0; i < wordToReplace.length; i++) {
          getId(wordToReplace[i]);
          new Opentip(wordToReplace[i], replaceTooltipContent(wordToReplace[i]) ,{ target: true, tipJoint: "bottom", targetJoint: "top", containInViewport: false, showOn: "mouseover", hideDelay: 1.5, removeElementsOnHide: true});
      }
    }
  });

  return simplemde;
};

var replaceTooltipContent = function(wordSpan) {

  var word = wordSpan.innerText;
  var html = "<ul>";
  for(var i = 0; i < plainEnglishReplacements[word].length; i ++){
    var option = plainEnglishReplacements[word][i];
    var li = "<li><a href='#' onclick=\"replaceHandler(\'" + wordSpan.id + "\', \'" + option + "\');\">" + option + "</a></li>";
    html = html + li;
  }
  html = html + "</ul>";
  return document.createElement("span").html=html;
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
