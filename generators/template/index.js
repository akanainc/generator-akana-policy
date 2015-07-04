'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var TemplateGenerator = yeoman.generators.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
  },

  writing: function () {
    if(this.props.handlerType=='Policy'){
    	var templatePath = (this.props.templatePackage || '').replace(/\./g, '/');
        this.template('OperationalPolicyTemplate.java', path.join('src/main/java', templatePath, this.props.component + 'Template.java'));
      }
  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = TemplateGenerator;
