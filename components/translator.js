const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    //Returns array with translation and highlighted translations
    translateToBritishEnglish(input) {
        return ['',''];
    }
    translateToAmericanEnglish(input) {
        return ['',''];
    }
}

module.exports = Translator;