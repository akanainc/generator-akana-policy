'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var BuildGenerator = yeoman.generators.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
   
  },

  writing: function () {
    this.template('build.xml', path.join('build', 'build.xml'), null, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template('project.properties', path.join('build', 'project.properties'));
    this.template('build.properties', 'build.properties');
    this.template('pom.xml', 'pom.xml', null, { 'interpolate': /<%=([\s\S]+?)%>/g});
  }
});

module.exports = BuildGenerator;
