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
    var assertionPath = (this.props.assertionPackage || '').replace(/\./g, '/');
    var marshallerPath = (this.props.marshallerPackage || '').replace(/\./g, '/');
    var templatePath = (this.props.templatePackage || '').replace(/\./g, '/');
    this.template(path.join('src/main/java', 'OperationalPolicyTemplate.java'), path.join(this.props.handlerModule, 'src/main/java', templatePath, this.props.component + 'Template.java'));
    this.template(path.join('src/main/java', 'Assertion.java'), path.join(this.props.handlerModule, 'src/main/java', assertionPath, this.props.component + 'Assertion.java'));
    this.template(path.join('src/main/java', 'AssertionMarshaller.java'), path.join(this.props.handlerModule, 'src/main/java', marshallerPath, this.props.component + 'AssertionMarshaller.java'));
    this.template(path.join('src/main/java', 'WSPHandlerFactory.java'), path.join(this.props.handlerModule, 'src/main/java', handlerPath, this.props.component + 'WSPHandlerFactory.java'));
    this.template(path.join('src/main/java', 'Constants.java'), path.join(this.props.handlerModule, 'src/main/java', constantsPath, this.props.component + 'Constants.java'));
    this.template(path.join('src/main/java', 'WSPMessageHandler.java'), path.join(this.props.handlerModule, 'src/main/java', handlerPath, this.props.component + 'MessageHandler.java'));

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
