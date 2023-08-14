const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translator = new Translator();
suite('Functional Tests', () => {
    suite('Test POST /api/translate', function() {
        let americanToBritish = 'Mangoes are my favorite fruit.';
        let britishToAmerican = 'We watched the footie match for a while.'

        let americanToBritishExpected = 'Mangoes are my favourite fruit.'
        let britishToAmericanExpected = 'We watched the soccer match for a while.'

        test('With text and locale fields', function(done) {
            chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                "text": americanToBritish,
                "locale": "american-to-british"
            })
            .end((err, res) => {

                assert.property(res.body, 'text');
                assert.property(res.body, 'translation');

                assert.isString(res.body.text);
                assert.isString(res.body.translation);

                assert.equal(res.body.text, americanToBritish);
                assert.equal(res.body.translation, americanToBritishExpected);
            });

            chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                "text": britishToAmerican,
                "locale": "british-to-american"
            })
            .end((err, res) => {

                assert.property(res.body, 'text');
                assert.property(res.body, 'translation');

                assert.isString(res.body.text);
                assert.isString(res.body.translation);

                assert.equal(res.body.text, britishToAmerican);
                assert.equal(res.body.translation, britishToAmericanExpected);
                done();
            });
        });
        // Translation with text and invalid locale field: POST request to /api/translate
        test('With text and invalid locale field', function(done) {
            chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                "text": britishToAmerican,
                "locale": "british-to-australian"
            })
            .end((err, res) => {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid value for locale field');
                done();
            });
            
        });
        // Translation with missing text field: POST request to /api/translate
        test('With missing text field', function(done) {
            chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                "locale": "british-to-american"
            })
            .end((err, res) => {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            })
        })
        // Translation with missing locale field: POST request to /api/translate
        test('With missing locale field', function(done) {
            chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                "text": americanToBritish
            })
            .end((err, res) => {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            });
        });
        // Translation with empty text: POST request to /api/translate
        test('With empty text', function(done) {
            chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                "text": '',
                "locale": "british-to-american"
            })
            .end((err, res) => {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'No text to translate');
                done();
            });
        });
        // Translation with text that needs no translation: POST request to /api/translate
        test('With text that needs no translation', function(done) {
            chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                "text": americanToBritish,
                "locale": "american-to-british"
            })
            .end((err, res) => {
                assert.property(res.body, 'text');
                assert.property(res.body, 'translation');

                assert.isString(res.body.text);
                assert.isString(res.body.translation);

                assert.equal(res.body.text, americanToBritish);
                assert.equal(res.body.translation, "Everything looks good to me!");
                done();
            });
        });

    })
});
