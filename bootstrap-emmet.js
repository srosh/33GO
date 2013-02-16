var fdom = require('../FlatDOM');
var Emmet = fdom.emmet;
var classJoin = function (arr,prefix) {
	prefix = prefix || '';
	prefix = '.' + prefix;
	return (arr ? prefix + arr.join(prefix) : '');
}

var navbar = function (arr) {
	var brand=arr[0],links=arr[1],active=arr[2],nbcls=arr[3];
	var lis = '';
	for (var i = 0; i < links.length; i++) {
		if (lis) lis += '+';
		lis += '(li'+((active && (active-1 == i)) ? '.active' : '')+'>a{'+links[i][0]+'}[href="'+links[i][1]+'"]'+')';
	};
	if (lis) lis = '+ul.nav>(' + lis + ')';
	return 'div.navbar'+(nbcls ? '.navbar-'+nbcls.join('.navbar-') : '')+'>div.navbar-inner>div.container>(a.brand{'+brand+'}'+lis+')';
}
var btnlink = function (arr) {
	var text=arr[0],href=arr[1],btncls=arr[2],target=arr[3];
	if (btncls) btncls='.btn-'+btncls.join('.btn-');
	else btncls='';
	href = href || '#';
	return 'a.btn'+btncls+'{'+text+'}[href="'+href+'"'+(target ? ' target="'+target+'"' : '')+']';
}
var herounit = function (arr) {
	var heading=arr[0],tagline=arr[1],extra=arr[2];
	return 'div.hero-unit>h1'+Emmet.text(heading)+'+p'+Emmet.text(tagline)+(extra ? '+('+extra+')' : '');
}
var progress = function (arr) {
	var percent=arr[0],pcls=arr[1],barcls=arr[2],active=arr[3];
	if ( percent instanceof Array ) {
		var bars = [];
		for (var i = 0; i < percent.length; i++) {
			bars.push('div[style="width: '+percent[i]+'%;"].bar'+(barcls && barcls[i] ? classJoin(barcls,'bar-') : ''));
		}
		return 'div.progress'+(active ? '.active' : '')+classJoin(pcls,'progress-')+'>'+bars.join('+');
	} else {
		return 'div.progress'+(active ? '.active' : '')+classJoin(pcls,'progress-')+'>div[style="width: '+percent+'%;"].bar'+classJoin(barcls,'bar-');
	}
}
var prevnext = function (arr) {
	var links = [];
	if(arr[0]) links.push('li.previous>a'+Emmet.text(arr[0][1])+'[href="'+arr[0][0]+'"]');
	if(arr[1]) links.push('li.next>a'+Emmet.text(arr[1][1])+'[href="'+arr[1][0]+'"]');
	return 'ul.pager>'+Emmet.join(links);
}
var linklist = function (arr) {
	var res = [];
	var from = arr.slice();
	var current;
	while (current = from.shift()) {
		if (current instanceof Array) {
			res.push('li>a'+Emmet.text(current[0])+'[href="'+current[1]+(current[2] ? '" target="_blank': '' )+'"]'+classJoin(current[3]));
		} else {
			res.push('li'+Emmet.text(current));
		}
	}
	return 'ul>'+Emmet.join(res);
}
Emmet.links = linklist;
Emmet.BSnavbar= navbar;
Emmet.BSbtn = btnlink;
Emmet.BShero = herounit;
Emmet.BSpager = prevnext;
Emmet.BSprogress = progress;
