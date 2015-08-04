var cheerio = require("cheerio");



var parseHtml = function  (html,callback) {
	var $ = cheerio.load(html);
	var dataTable = $("table").first().children();
	//console.log($("table").first().children().first().text());
	return callback(null,dataTable.text());

}

module.exports.parseHtml = parseHtml;