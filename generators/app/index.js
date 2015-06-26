'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay')
  , validator = require('validator')
  , superb    = require('superb')
  , path      = require('path');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    /* istanbul ignore if */
    if (!this.options['skip-intro']) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the ' + superb() +  chalk.red(' Akana Policy') +' generator!'
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
    , message: 'Choose a package namespace'
    , default: this.config.get('namespace')
    },{
       type: 'input'
    , name: 'component'
    , message: 'Name your Class prefix (TitleCase - Alphanumeric)'
    , default: this.config.get('component')
    , validate: function (input) {
        return validator.isAlphanumeric(input);
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.config.set(props);

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

    config: function () {
      this.directory('config');
    },

    meta: function () {
      this.composeWith('akana-policy:meta', {}, {
        link: 'strong'
      }); 
    },

    build: function () {
      this.composeWith('akana-policy:build', {}, {
        link: 'strong'
      });      
    },

    handler: function () {
      this.composeWith('akana-policy:handler', {}, {
        link: 'strong'
      }); 
    }
  },

  end: function () {
    this.config.save();
  },

  install: function () {
    
  }
});