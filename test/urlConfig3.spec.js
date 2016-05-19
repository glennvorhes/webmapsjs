/**
 * Created by gavorhes on 5/5/2016.
 */


import quickMap from '../src/olHelpers/quickMap';

// import quickMap from '../src/olHelpers/quickMap';
let chai = require('chai');

describe('karma test with Chaiadfadf', function() {
  it('should expose the Chai assert method', function() {
    let map = quickMap();
    // console.log(map);
    assert.ok('everything', 'everything is ok');
  });

  it('should expose the Chai expect method', function() {
    'foo'.should.not.equals('t');
  });

  it('should expose the Chai should property', function() {
    should.exist(123);
    (1).should.not.equal(2);
  });

  it('should work with ES6 fat arrow function', () => {
    (1).should.not.equal(2);
    (1).should.not.equal(2);
    (2).should.not.equal(3);
    (2).should.not.equal(3);
    (2).should.not.equal(10);
    (2).should.not.equal(10);
    (2).should.not.equal(2);
  });
});



describe('karma test with 2adfaasdf', function() {
  it('should expose the Chai assert method', function() {
    assert.ok('everything', 'everything is ok');
  });

  it('should expose the Chai expect method', function() {
    
    expect('foo').to.not.equal('bar');
    expect('cat').to.equal('cat');
    expect('cat').to.equal('bird');
  });

  it('should expose the Chai should property', function() {
    should.exist(123);
    (1).should.not.equal(2);
  });

  it('should work with ES6 fat arrow function', () => {
    (1).should.not.equal(2);
    (1).should.not.equal(2);
    // (2).should.not.equal(2);
    // (2).should.not.equal(2);
    // (2).should.not.equal(2);
  });
});



