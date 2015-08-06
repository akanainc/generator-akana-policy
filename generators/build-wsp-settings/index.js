'use strict';


var path   = require('path'),
    yeoman = require('yeoman-generator');


module.exports = yeoman.generators.Base.extend({


  initializing: function () {
  	
    this.props = this.config.getAll();
   
  },

  writing: function () {
  	this.directory('lib', 'build/lib');
    this.template(path.join('build', 'build.xml'), path.join('build', 'build.xml'), null, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(path.join('build', 'project.properties'), path.join('build', 'project.properties'), null, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template('pom.xml', path.join('build','pom.xml'), null, { 'interpolate': /<%=([\s\S]+?)%>/g});
  }
});

