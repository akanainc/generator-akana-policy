'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var ModelGenerator = yeoman.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
  },

  writing: function () {
    
    var modelPath = (this.props.modelPackage || '').replace(/\./g, '/');

    this.template(path.join('src/main/java','Settings.java'), path.join(this.props.modelModule, 'src/main/java', modelPath, '<%= props.component %>Policy.java'));
    this.template(path.join('src/main/java','ObjectFactory.java'), path.join(this.props.modelModule, 'src/main/java', modelPath, 'ObjectFactory.java'));
    this.template(path.join('src/main/java','package-info.java'), path.join(this.props.modelModule, 'src/main/java', modelPath, 'package-info.java'));
    
    this.directory('build/lib', path.join(this.props.modelModule, 'build/lib'));
    this.template(path.join('build', 'build.xml'), path.join(this.props.modelModule, 'build', 'build.xml'), null, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(path.join('build', 'project.properties'), path.join(this.props.modelModule, 'build', 'project.properties'), null, { 'interpolate': /<%=([\s\S]+?)%>/g});
    this.template('pom.xml', path.join(this.props.modelModule, 'pom.xml'), null, { 'interpolate': /<%=([\s\S]+?)%>/g});
    this.template(path.join('META-INF/resources', 'sample.xml'), path.join(this.props.modelModule,'META-INF/resources','sample-policy.xml'));
    this.template(path.join('META-INF/resources', 'policy.xsd'), path.join(this.props.modelModule,'META-INF/resources', 'policy.xsd'), null, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(path.join('META-INF/resources', 'policy.xjb'), path.join(this.props.modelModule,'META-INF/resources', 'policy.xjb'), null, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(path.join('META-INF', 'MANIFEST.INF'), path.join(this.props.modelModule, 'META-INF', 'MANIFEST.MF')); 
    this.template(path.join('META-INF/resources', 'sample.xml'), path.join(this.props.modelModule, 'sample-policy.xml'));     
  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = ModelGenerator;
