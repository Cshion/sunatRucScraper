var async         = require("async");
var request       = require("request");
var captchaParser = require("./captchaParser");
var domParser     = require("./domParser");
var fs            = require("fs");

var opts = { 
		jar:true,
		encoding:null
}

request = request.defaults(opts);

function getCatchaImage (objectRuc,callback) {
	var urlCaptcha = "http://ww1.sunat.gob.pe/cl-ti-itmrconsruc/captcha?accion=image";

	request(urlCaptcha,function  (error,response,buffer) {
		if(error)
			return callback(error);
		return callback(null,objectRuc,buffer);
	});

}

function  parseCaptchaImage(objectRuc,buffer,callback) {
	captchaParser.getCaptcha(buffer,function  (error,text) {
		if(error)
			return callback(error);
		return callback(null,objectRuc,text);
	});
}

function  getDataRuc(objectRuc,captcha,callback) {
	var urlForm    = "http://ww1.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias";

	var data = {
		accion:"consPorRuc",
		razSoc:null,
		nroRuc:objectRuc.ruc,
		nrodoc:null,
		contexto:"ti-it",
		tQuery:"on",
		search1:objectRuc.ruc,
		codigo:captcha,
		tipdoc:"1",
		search2:null,
		coddpto:null,
		codprov:null,
		coddist:null,
		search3:null
	};

	request.post(urlForm,{form:data},function  (error,response,body) {
		if(error)
			return callback(error);
		return callback(null,objectRuc,body.toString());
	});
}


function  parseDom(objectRuc,html,callback) {
	
	fs.writeFileSync("tests/test.html",html,{encoding:"utf-8"});
	domParser.parseHtml(html,function  (err,dataHtml) {
		if(err)
			return callback(err);
		return callback(null,dataHtml);
	});
}

//TODO future features
/*
function  getHistory(dataRuc,callback) {
	var urlForm    = "http://ww1.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias";	
	var data = {
		accion : "getinfHis",
		nroRuc : dataRuc.ruc,
		desRuc : dataRuc.razonSocial
	}
	request.post(urlForm,{form:data}, ....)
}

*/

var sendRequest = function  (objectRuc,callback) {
	if(typeof objectRuc != "object")
		throw new Error("First parameter must be a object");

	async.waterfall([
		async.constant(objectRuc),
		getCatchaImage,
		parseCaptchaImage,
		getDataRuc,
		parseDom
	],function  (error,result) {
		if(error){
			return callback(error,null);
		}else{
			return callback(null,result);
		}
	});
}



sendRequest({ruc:"20434178780"},function  (error,result) {
	if(error)
		console.log(error);
	else 
		console.log(result);
})