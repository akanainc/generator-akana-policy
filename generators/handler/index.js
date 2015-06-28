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
      choices: ['Message', 'Policy']
    }]

    this.prompt(prompts, function (props) {
      this.props.handlerType = props.handlerType;
      done()
    }.bind(this));
    
  },

  initializing: function () {
    this.props.handlerPackage = this.props.namespace + '.handler';
  },

  writing: function () {
    var handlerPath = (this.props.handlerPackage || '').replace(/\./g, '/');
    this.template('MessageHandler.java', path.join('src/main/java', handlerPath, this.props.component + 'MessageHandler.java'));
    if(this.props.handlerType=='Policy'){
      this.template('WSPHandlerFactory.java', path.join('src/main/java', handlerPath, this.props.component + 'WSPHandlerFactory.java'));

    }else{
      this.template('MessageHandlerFactory.java', path.join('src/main/java', handlerPath, this.props.component + 'MessageHandlerFactory.java'));

    }

  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = HandlerGenerator;
