module.exports = function(content) {
  this.cacheable && this.cacheable();
  return "module.exports=Handlebars.compile(" + JSON.stringify(content)  + ");"
};
