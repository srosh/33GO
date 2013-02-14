var fdom = require('../FlatDOM')
var DOM = fdom.dom;
// fix: cwd for imports
function Template (arrDOM,parentHead,vars) {
	DOM.apply(this,arguments);
	this.mods = {
		dom: new DOM(this)
		,html: new fdom.html(this)
		,md: new fdom.md(this)
		,emmet: new fdom.emmet(this)
		,jsonml: new fdom.jsonml(this)
		,'3390': this
	};
	this.mods.markdown = this.mods.md;
	this.mods.json = this.mods.templar;
	this.mods.zen = this.mods.emmet;
	this.vars = vars || {};
}
require('util').inherits(Template,DOM);

Template.prototype.read = function (source,toParent) {
	var from; 
	if (typeof source == 'string') {
		from = JSON.parse(source);
	} else from = source;
	var parent = (toParent===undefined ? this.dom.openTags.pop() : toParent);
	for (var i = 0; i < from.length; i++) {
		if (from[i] instanceof Array) {
			this.read(from[i],this.dom.openTags.pop());
		} else if(typeof from[i] == 'string') {
			var extension = from[i].match(/\.([\w]+)$/);
			var mod;
			if (extension && (mod = this.mods[extension[1].toLowerCase()])) {
				mod.readFile(from[i],parent);
			} else throw new Error(from[i]+' not recognised.');
		} else {
			var mod = this.mods[from[i].mod];
			if (from[i].type && from[i].type == 'file') {
				if (from[i].val) mod.readFile(from[i].val,parent);
				else if (from[i]['var'] && this.vars[from[i]['var']]) mod.readFile(this.vars[from[i]['var']],parent);
			} else if (!from[i].type) {
				var builder, val=from[i].val;
				if(!val && from[i]['var'] && this.vars[from[i]['var']]) val =  this.vars[from[i]['var']];
				if (from[i].builder && (builder = mod.constructor[from[i].builder])) {
					mod.read(builder(val),parent);
				} else {
					mod.read(val,parent);
				}
			}
		}
	}
	return this;
}

Template.prototype.render = function () {
	return this.mods.html.render();
}

var jsonReadFile = function (fn) {
	var fs = require('fs');
	return JSON.parse(fs.readFileSync(fn,'utf-8'));
}
Template.build = function(template,vars) {
	if (!template || !vars) throw new Error('arguments to build are not sufficient');
	if (typeof template == 'string') template = jsonReadFile(template);
	if (typeof vars == 'string') vars = jsonReadFile(vars);
	var res = new Template();
	res.vars = vars;
	return res.read(template);
}

module.exports = Template;