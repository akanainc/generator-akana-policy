'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var ClassGenerator = yeoman.generators.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
    this.props.packageHandler = this.props.namespace + '.handler';
  },

  writing: function () {
    var packageHandler = (this.props.packageHandler || '').replace(/\./g, '/');

    this.template('MessageHandler.java', path.join('src/main/java', packageHandler, this.props.component + 'MessageHandler.java'));
    this.template('MessageHandlerFactory.java', path.join('src/main/java', packageHandler, this.props.component + 'MessageHandlerFactory.java'));
  }
});

module.exports = ClassGenerator;
