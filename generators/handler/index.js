'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var HandlerGenerator = yeoman.generators.Base.extend({

  constructor: function(){
    yeoman.generators.Base.apply(this, arguments);
    this.props = this.config.getAll();
  },

  prompting: function () {
    var done = this.async();
    var prompts = [{
      type: 'list',
      name: 'handlerType',
      message: 'Select your handler factory',
      choices: [{'value':'Policy', 'name':'WSPHandlerFactory'}, {'value':'Message', 'name': 'MessageHandlerFactory'}]
    }]

    this.prompt(prompts, function (props) {
      this.props.handlerType = props.handlerType;
      done()
    }.bind(this));
    
  },

  initializing: function () {
    this.props.handlerPackage = this.props.namespace + '.handler';
    this.props.constantsPackage = this.props.namespace + '.constants';
  },

  writing: function () {
    var handlerPath = (this.props.handlerPackage || '').replace(/\./g, '/');
    var constantsPath = (this.props.constantsPackage || '').replace(/\./g, '/');
    this.log(this.props.component)
    
    if(this.props.handlerType=='Policy'){
      this.template('WSPHandlerFactory.java', path.join('src/main/java', handlerPath, this.props.component + 'WSPHandlerFactory.java'));
      this.template('Constants.java', path.join('src/main/java', constantsPath, this.props.component + 'Constants.java'));
      this.template('WSPMessageHandler.java', path.join('src/main/java', handlerPath, this.props.component + 'MessageHandler.java'));
    }else{
      this.template('MessageHandlerFactory.java', path.join('src/main/java', handlerPath, this.props.component + 'MessageHandlerFactory.java'));
      this.template('MessageHandler.java', path.join('src/main/java', handlerPath, this.props.component + 'MessageHandler.java'));
    }
  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = HandlerGenerator;
