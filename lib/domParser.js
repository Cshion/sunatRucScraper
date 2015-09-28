var cheerio = require("cheerio");

var parseHtml = function  (html,callback) {
	var $ = cheerio.load(html);
	var table = $("table").first().children("tr")

	var contribuyente = {};	
	var initData = table.first().children().eq(1).html().split("-").map(function  (wat) {
		return wat.trim();
	});

	contribuyente.idReceptor          = initData[0];
	contribuyente.razonSocial         = initData[1];
	contribuyente.condicion           = table.eq(4).children().eq(1).text().trim();
	contribuyente.estado              = table.eq(5).children().eq(1).text().trim();
	contribuyente.direccionReferencia = table.eq(6).children().eq(1).text().split("-").map(function  (splited) {
		return splited.trim();
	}).join("-");
	return callback(null,contribuyente);
}

module.exports.parseHtml = parseHtml;