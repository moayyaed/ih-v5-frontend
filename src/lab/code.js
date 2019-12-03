var editor = ace.edit("editor");
const lt = ace.require("ace/ext/language_tools");


function getCompletions(editor, session, pos, prefix, callback) {
  console.log(editor, session, pos, prefix);
  var wl = [
    { caption: 'test1', value: 'test1', meta: 'static' },
    { caption: 'test1.', value: 'test1', meta: 'static' }
  ];
  
  callback(null, wl); 
}

const item = {
 // identifierRegexps: [/[a-zA-Z_0-9\.\$\-\u00A2-\uFFFF]/],
  getCompletions
}

// lt.setCompleters();
// lt.setCompleters([item]);


editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
});

editor.commands.on("afterExec", function (e) {
    if (e.command.name == "insertstring" && /^[\w.]$/.test(e.args)) {
        editor.execCommand("startAutocomplete");
    }
});
