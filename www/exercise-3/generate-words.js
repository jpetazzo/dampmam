const fs = require('fs');
const gttk = require('google-translate-token');
const http = require('http');

function translate(source_lang, target_lang, word, callback) {
  gttk.get(word).then(function (tk) {
    var path = '/translate_a/single?client=t';
    path += '&sl=' + source_lang;
    path += '&tl=' + target_lang;
    path += '&dt=bd';
    path += '&tk=' + tk.value;
    path += '&q=' + word;
    var data = '';
    var options = {
      hostname: 'translate.google.com',
      path: path,
      headers: { 'user-agent': 'Mozilla/5.0' },
      agent: false
    };
    http.get(options, function (msg) {
      msg.on('data', function (chunk) { data += chunk; });
      msg.on('end', function (e) { callback(data); });
    });
  });
}

var dictionary = {};

fs.readFile('words1000.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error(err);
  }
  var words = data.split('\n');

  // Limit to first 10 elements (for quick testing)
  //words = words.splice(0, 10);

  words.forEach(function (word) {
    if (word == '\n') { return; }
    translate('en', 'fr', word, function (rawdata) {
      const parsed = JSON.parse(rawdata);
      if (parsed[1] == null) {
        console.log(word + ' => ?');
        dictionary[word] = [];
      } else {
        const translated = parsed[1][0][1];
        console.log(word + ' => ' + translated);
        dictionary[word] = translated;
      }
      if (Object.keys(dictionary).length == words.length) {
        fs.writeFileSync('words.en.fr.json', JSON.stringify(dictionary), 'utf8');
      }
    });
  });
});



