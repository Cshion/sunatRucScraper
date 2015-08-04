var dv      = require("dv");
var request = require("request");
var async   = require("async");


var getText = function  (buffer,callback) {
	var image     = new dv.Image('jpg',buffer);
	var tesseract = new dv.Tesseract("eng",image);
	return callback(null,tesseract.findText('plain'));
}

var cleanText = function  (text,callback) {
	var err = new Error("Error parsing captcha ,Try again");
	
	if(!text) 
		return callback(err,null);

	var result = text.replace(/[^A-Z]/g,"");
	
	if(result.length!==4) 
		return callback(err,null);

	return callback(null,result);
}

	
function  getCaptcha(buffer,callback) {
	async.waterfall([
		async.constant(buffer),
		getText,
		cleanText
	],function  (err,result) {
		if(err)
			return callback(err,null);
		else
			return callback(null,result);
	});
}

module.exports.getCaptcha = getCaptcha;
