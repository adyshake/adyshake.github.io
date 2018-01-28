var createLine, getInput, print, printBlock, printError, printHelper, printInput, printMenu, removeInput, runCommand, setFocus, span;

span = void 0;

printInput = function() {
  var input, p;
  input = void 0;
  p = void 0;
  input = '<input type="text" name="command" class="command">';
  p = '<p id=\'command\'>> ' + input + '</p>';
  $('#wrapper').append(p);
  setFocus();
};

getInput = function() {
  return $('.command').val();
};

removeInput = function() {
  $('#command').remove();
};

createLine = function(value) {
  var line;
  line = void 0;
  line = '<p class=\'command-value\'>> ' + value + '</p>';
  $('#wrapper').append(line);
};

print = function(element) {
  $('#wrapper').append(element);
};

printBlock = function(element) {
  var text;
  text = void 0;
  text = '<div class=\'text\'>' + element + '</div>';
  $('#wrapper').append(text);
};

printError = function(error) {
  var line;
  if (error == null) {
    error = 'Command not found';
  }
  line = void 0;
  line = '<p class=\'command-error\'>' + error + '</p>';
  print(line);
};

printHelper = function(text) {
  var t;
  if (text.indexOf('<p') !== -1) {
    return text;
  } else {
    t = '<p>' + text + '</p>';
    return t;
  }
};

printMenu = function(menu) {
  var content;
  content = '';
  $.each(menu, function(key, value) {
    if (value.length > 1) {
      content += '<li class=\'item_menu\'><h3>' + value[0] + '</h3><p class=\'content\'>' + value[1] + '</p></li>';
    } else {
      content += '<li class=\'item_menu\'><p class=\'content\'>' + value[0] + '</p></li>';
    }
  });
  $('#wrapper').append('<ul class=\'menu\'>' + content + '</ul>');
};

runCommand = function(command) {
  var a, c, exe, helper, text;
  a = command.split(' ');
  c = a.shift();
  text = void 0;
  c = c.toLowerCase();
  if (command in _commands) {
    exe = _commands[command]();
    if (typeof exe === 'string') {
      helper = printHelper(exe);
      printBlock(helper);
    } else if (typeof exe === 'object') {
      printMenu(exe);
    }
  } else if (c in _commands) {
    if (a.length > 0) {
      exe = _commands[c](a);
    } else {
      exe = _commands[c]();
    }
    if (typeof exe === 'string') {
      helper = printHelper(exe);
      printBlock(helper);
    } else if (typeof exe === 'object') {
      printMenu(exe);
    }
  } else if (command in _filetree) {
    printMenu(_filetree[command]);
  } else if (c in _filetree) {
    printMenu(_filetree[c]);
  } else {
    printError();
  }
};

span = '<span class=\'pront\'>> </span>';

setFocus = function() {
  $('.command').focus();
};
