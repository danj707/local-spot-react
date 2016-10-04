var React = require('react');
var TestUtils = require('react-addons-test-utils');
var should = require('chai').should();

var Layout = require('../components/Layout');

describe('Layout Component', function() {
    it('Renders the layout',  function() {

        var renderer = TestUtils.createRenderer();
        renderer.render(<Layout />);
        var result = renderer.getRenderOutput();
        result.props.className.should.equal('layout');

        // var img = result.props.children[0];
        // img.type.should.equal('img');
        // img.props.src.should.equal(url);
        // img.props.alt.should.equal(description);
        //
        // var p = result.props.children[1];
        // p.type.should.equal('p');
        // p.props.children.should.equal(description);
    });
});
