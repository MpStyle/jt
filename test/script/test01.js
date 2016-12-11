module.exports = {
    "browser": ["chrome"],
    'index_01.html test': function (test) {
        test
            .open('test/html/index_01.html')
            .assert.title().is('Test 1', 'It has title')

            .waitForElement('.black')
            .assert.text(".black").is('Hello world!')
            .assert.attr('.black', 'src', 'en')
            .assert.attr('.black', 'title', 'Hello world')
            .assert.attr('.black', 'alt', 'Hello')
            .assert.attr('.black', 'href').to.contain('#en')

            .waitForElement('.red')
            .assert.text(".red").is('Ciao mondo')
            .assert.attr('.red', 'src', 'it')
            .assert.attr('.red', 'title', 'Ciao mondo')
            .assert.attr('.red', 'alt', 'Ciao')
            .assert.attr('.red', 'href').to.contain('#it')

            .waitForElement('.fff')
            .assert.text(".fff").is('aaa')
            .assert.attr('.fff', 'src', 'bbb')
            .assert.attr('.fff', 'title', 'ccc')
            .assert.attr('.fff', 'alt', 'ddd')
            .assert.attr('.fff', 'href').to.contain('eee')

            .end()
            .done();
    }
};