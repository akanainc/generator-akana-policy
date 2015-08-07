'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var HandlerGenerator = yeoman.generators.Base.extend({

  constructor: function(){
    yeoman.generators.Base.apply(this, arguments);
    this.props = this.config.getAll();
  },

  initializing: function () {

  },

  writing: function () {
    var handlerPath = (this.props.handlerPackage || '').replace(/\./g, '/');
    var constantsPath = (this.props.constantsPackage || '').replace(/\./g, '/');

    this.template(path.join('src/main/java', 'MessageHandlerFactory.java'), path.join(this.props.handlerModule, 'src/main/java', handlerPath, this.props.component + 'MessageHandlerFactory.java'));
    this.template(path.join('src/main/java', 'MessageHandler.java'), path.join(this.props.handlerModule, 'src/main/java', handlerPath, this.props.component + 'MessageHandler.java'));
    
    this.template(path.join('OSGI-INF', 'handler-osgi.xml'), path.join(this.props.handlerModule, 'META-INF/spring', 'handler-osgi.xml'));
    this.template(path.join('META-INF', 'MANIFEST.MF'), path.join(this.props.handlerModule, 'META-INF', 'MANIFEST.MF'));

    this.template(path.join('build', 'build.xml'), path.join(this.props.handlerModule, 'build', 'build.xml'), null, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(path.join('build', 'project.properties'), path.join(this.props.handlerModule, 'build', 'project.properties'), null, { 'interpolate': /<%=([\s\S]+?)%>/g});
       

  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = HandlerGenerator;
