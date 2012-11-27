var assert = require("assert")
var grunt = require("grunt")

describe('basic', function(){
  it('compiles a basic css', function(done){
    var actual = grunt.file.read('tmp/modules/basic.css.js')
    var expected = grunt.file.read('test/expected/basic.css.js')
    assert.equal(actual, expected, 'should compile into a module')

    done()
  })
})