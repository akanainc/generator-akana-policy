'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var ModelGenerator = yeoman.generators.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
    this.props.modelPackage = this.props.assertionPackage + '.model';
  },

  writing: function () {
    if(this.props.handlerType=='Policy'){
        var modelPath = (this.props.modelPackage || '').replace(/\./g, '/');
        this.template('ObjectFactory.java', path.join('src/main/java', modelPath, 'ObjectFactory.java'));
        this.template('Settings.java', path.join('src/main/java', modelPath, 'Settings.java'));
        this.template('package-info.java', path.join('src/main/java', modelPath, 'package-info.java'));
        this.template('sample.xml', 'sample-policy.xml');
      }
  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = ModelGenerator;
