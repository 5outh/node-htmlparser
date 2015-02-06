var _ = require('lodash'),
    nanoscope = require('nanoscope'),
    Promise = require('bluebird'),
    fs = require('fs'),

    htmlparser = require('../lib/htmlparser'),
    utils = require('./utils'),

    testFeed = fs.readFileSync(__dirname+'/resources/feed.xml', 'utf-8');

describe('CDATA Strip', function () {
    var rssBuilder = new htmlparser.RssBuilder(function (error, dom) {
        if (error) { console.error(error); }
    }), rssParser = new htmlparser.Parser(rssBuilder),
        htmlBuilder = new htmlparser.HtmlBuilder(function (error, dom) {
            if (error) { console.error(error); }
        }),
        htmlParser = new htmlparser.Parser(htmlBuilder);

    it('should strip CDATA from description and return normal text', function () {
        var dom,
            descriptionDom;

        rssParser.parseComplete(testFeed);
        dom = rssBuilder.dom;

        _.forEach(dom.items, function (item) {
            htmlParser.parseComplete(item.description, {verbose: false});
            descriptionDom = htmlBuilder.dom;

            console.log(utils.findRecursive(descriptionDom, function (block) {
                //console.log(block);
                return nanoscope(block).path('attributes.class').get() === 'reviewText';
            }));

            //console.log(JSON.stringify(htmlBuilder.dom, null, 2));
        });
    });
});