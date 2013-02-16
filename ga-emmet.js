var fdom = require('../FlatDOM');
var Emmet = fdom.emmet;

Emmet.ga = function (trackingID) {
	return "script[type=\"text/javascript\"]>!--{\n_gaTrackingId = '"+trackingID+"';\nvar _gaq = _gaq || \\[\\];\n_gaq.push\\(\\['_setAccount', _gaTrackingId\\]\\);\n_gaq.push\\(\\['_trackPageview'\\]\\);\n\n\\(function\\(\\) \\{\nvar ga = document.createElement\\('script'\\); ga.type = 'text/javascript'; ga.async = true;\nga.src = \\('https:' == document.location.protocol ? 'https://ssl' : 'http://www'\\) + '.google-analytics.com/ga.js';\nvar s = document.getElementsByTagName\\('script'\\)\\[0\\]; s.parentNode.insertBefore\\(ga, s\\);\n\\}\\)\\(\\);\n}";
}