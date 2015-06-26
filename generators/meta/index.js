'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var MetaGenerator = yeoman.generators.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
    this.props.packageHandler = this.props.namespace + '.handler';
  },

  writing: function () {
    this.template('handler-osgi.xml', path.join('META-INF/spring', 'handler-osgi.xml'));
    this.template('MANIFEST.MF', path.join('META-INF', 'MANIFEST.MF'));
  }
});

module.exports = MetaGenerator;
