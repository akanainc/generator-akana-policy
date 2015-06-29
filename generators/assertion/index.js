'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var AssertionGenerator = yeoman.generators.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
    this.props.assertionPackage = this.props.namespace + '.assertion';
  },

  writing: function () {
    if(this.props.handlerType=='Policy'){
    	var assertionPath = (this.props.assertionPackage || '').replace(/\./g, '/');
        this.template('Assertion.java', path.join('src/main/java', assertionPath, this.props.component + 'Assertion.java'));
      }
  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = AssertionGenerator;
