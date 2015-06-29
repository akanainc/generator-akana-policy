'use strict';

var path   = require('path')
  , yeoman = require('yeoman-generator');

var MetaGenerator = yeoman.generators.Base.extend({


  initializing: function () {
    this.props = this.config.getAll();
    this.props.handlerPackage = this.props.namespace + '.handler';
  },

  writing: function () {  
    this.template('MANIFEST.MF', path.join('META-INF', 'MANIFEST.MF'));
    if(this.props.handlerType=='Policy'){
    	this.template('wsp-handler-osgi.xml', path.join('META-INF/spring', 'handler-osgi.xml'));
    }else{
    	this.template('handler-osgi.xml', path.join('META-INF/spring', 'handler-osgi.xml'));
    }
  },

  end: function(){
    this.config.set(this.props)
  }
});

module.exports = MetaGenerator;
