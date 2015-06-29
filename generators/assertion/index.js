'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var AssertionGenerator = yeoman.generators.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
    this.props.assertionPackage = this.props.namespace + '.assertion';
    this.props.marshallerPackage = this.props.assertionPackage + '.marshaller';
  },

  writing: function () {
    if(this.props.handlerType=='Policy'){
    	var assertionPath = (this.props.assertionPackage || '').replace(/\./g, '/');
    	var marshallerPath = (this.props.marshallerPackage || '').replace(/\./g, '/');
        this.template('Assertion.java', path.join('src/main/java', assertionPath, this.props.component + 'Assertion.java'));
        this.template('AssertionMarshaller.java', path.join('src/main/java', marshallerPath, this.props.component + 'AssertionMarshaller.java'));
      }
  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = AssertionGenerator;
