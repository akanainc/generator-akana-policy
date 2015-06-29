'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var ModelGenerator = yeoman.generators.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
    
  },

  writing: function () {
    if(this.props.handlerType=='Policy'){
        this.directory('.', 'src/main/java');
      }
  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = ModelGenerator;
