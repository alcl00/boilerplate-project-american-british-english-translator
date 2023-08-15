'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  let validLocales = ["american-to-british", "british-to-american"];

  app.route('/api/translate')
    .post((req, res) => {
      if(req.body.text === undefined || !req.body.locale) {
        res.json({ error : 'Required field(s) missing' })
        return;
      }
      
      if(req.body.text == "") {
        res.json({ error: 'No text to translate' })
        return;
      }

      if(!validLocales.includes(req.body.locale)) {
        res.json({ error: 'Invalid value for locale field' })
        return;
      }

      let translation;
      
      if(req.body.locale === "american-to-british") {
        translation = translator.translateToBritishEnglish(req.body.text);
        
      }
      else if(req.body.locale === "british-to-american") {
        translation = translator.translateToAmericanEnglish(req.body.text);
      }
      
      if(!translation || translation === req.body.text) {
        res.json({ text: req.body.text, translation: "Everything looks good to me!" })
        return;
      }
      res.json({ text: req.body.text, translation: translation[1] })
    });
};
