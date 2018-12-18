# Sunat Ruc Scraper

## Requisitos
- Installed Nodejs >= 0.10

## Instalacion
- npm install 


## Ejemplo :

	var rucScraper = require("./lib");
	rucScraper({ruc:"20434178780"},function  (err,data) {
		if(err)
			console.log(err)
		console.log(data);
	})



## TODO 
- Update Readme
- Informacion de RUC (Done)
- Informacion Historica
- Deuda Coactiva
- Omisiones Tributarias
- Cantidad de trabajadores y/o Prestadores de servicio
- Representantes Legales
