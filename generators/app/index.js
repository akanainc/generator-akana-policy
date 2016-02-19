'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay')
  , validator = require('validator')
  , superb    = require('superb')
  , superheroes  = require('superheroes')
  , path      = require('path');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    
    if (!this.options['skip-intro']) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the ' + superb() +  chalk.red(' Akana Custom Policy') +' generator!'
      ));
    }

    var prompts = [{
       type: 'input'
    , name: 'title'
    , message: 'Name your project'
    , default: this.config.get('title')
    , validate: function (input) {
        return input ? true : false;
      }
    }, {
      type: 'input'
    , name: 'description'
    , message: 'What\'s your project about? (optional)'
    , default: this.config.get('description') || null
    }, {
      type: 'input'
    , name: 'author'
    , message: 'What\'s your name?'
    , default: this.config.get('author')
    , validate: function (input) {
        return input ? true : false;
      }
    }, {
      type: 'input'
    , name: 'email'
    , message: 'What\'s your email?'
    , default: this.config.get('email')
    , validate: function (input) {
        return validator.isEmail(input);
      }
    }, {
      type: 'input'
    , name: 'namespace'
    , message: 'Name your Java package namespace'
    , default: this.config.get('namespace')
    },{
       type: 'input'
    , name: 'component'
    , message: 'Name your Java class prefix (TitleCase - Alphanumeric)'
    , default: this.config.get('component')
    , validate: function (input) {
        return validator.isAlphanumeric(input);
      }
    },{
      type: 'list',
      name: 'handlerType',
      message: 'Select your handler factory',
      choices: [{'value':'Policy', 'name':'  WSPHandlerFactory'}, {'value':'Message', 'name': '  MessageHandlerFactory'}]
    },{
      type: 'input',
      name: 'bundleVersion',
      message: 'Policy Version',
      default: this.config.get('bundleVersion') || '8.0.0',
      validate: function (input) {
        return input ? true : false;
      }
    },{
      type: 'input',
      name: 'akanaPlatformVersion',
      message: 'Akana Platform Release Version',
      default: this.config.get('akanaPlatformVersion') || '8.1.0',
      validate: function (input) {
        return input ? true : false;
      }
    },{
      type: 'input',
      name: 'gatewayBaseVersion',
      message: 'API Gateway Release Version',
      default: this.config.get('gatewayBaseVersion') || '8.0.0',
      validate: function (input) {
        return input ? true : false;
      }
    },{
      type: 'input',
      name: 'gatewayUpdateVersion',
      message: 'API Gateway Cumulative Update Version',
      default: this.config.get('gatewayUpdateVersion') || '8.0.1',
      validate: function (input) {
        return input ? true : false;
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.templatePackage = this.props.namespace + '.template';
      this.props.assertionPackage = this.props.namespace + '.assertion';
      this.props.marshallerPackage = this.props.assertionPackage + '.marshaller';
      this.props.modelPackage = this.props.namespace + '.model';
      this.props.handlerPackage = this.props.namespace + '.handler';
      this.props.constantsPackage = this.props.namespace + '.constants';
      this.props.modelModule = this.props.modelPackage;
      this.props.handlerModule = this.props.handlerPackage;
      this.props.handlerFeature = this.props.handlerPackage + '.feature';
      this.config.set(this.props);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    readme: function () {
      this.template('README.md');
    },

    wsp: function () {
      if(this.props.handlerType=='Policy'){
        this.composeWith('akana-policy:feature-wsp-settings', {}, {
          link: 'strong'
        })
        this.composeWith('akana-policy:handler-wsp-settings', {}, {
          link: 'strong'
        })
        this.composeWith('akana-policy:model-wsp-settings', {}, {
          link: 'strong'
        })
        this.composeWith('akana-policy:build-wsp-settings', {}, {
          link: 'strong'
        })
        this.template('pom-wsp-settings.xml', 'pom.xml', null, { 'interpolate': /<%=([\s\S]+?)%>/g});
      }
    },

    message: function(){
      if(this.props.handlerType=='Message'){
        this.composeWith('akana-policy:feature-message', {}, {
          link: 'strong'
        })
        this.composeWith('akana-policy:handler-message', {}, {
          link: 'strong'
        })
        this.template('pom-message.xml', 'pom.xml', null, { 'interpolate': /<%=([\s\S]+?)%>/g});

      }
    } 
  },

  end: function () {
    this.config.save();
    this.log(yosay(
      'Alright, ' + chalk.red(superheroes.random()) +  ' you are all set!'
    ));
  }

});