const fs = require("fs");

const readJSON = function(fileName) {
	return new Promise(function(resolve, reject) {
		fs.readFile(fileName, "utf8", (err, data) => {
			err ? reject(err) : resolve(JSON.parse(data));
		});
	});
};

const search = function(string, array) {
	array.forEach(element => {
		if (element.city == string) {
			console.log(element);
		}
	});
};

const deleteCity = function(string, array) {
	array.forEach(function(element, index, array) {
		if (element.city == string) {
			array.splice(index, 1);
		}
	});
	return array;
};

const addCity = function(city, population, state, array) {
	let newCity = { city: city, population: population, state: state };
	array.push(newCity);
	return array;
};

const mergeUserCity = function(users, cities) {
	var ausgabe = [];
	users.forEach(element => {
		var ort = 0;
		for (i = 0; i < cities.length; i++) {
			if (element.wohnort == cities[i].city) {
				ort = i;
				break;
			}
		}
		let newElem = {
			vorname: element.vorname,
			name: element.name,
			email: element.email,
			wohnort: element.wohnort,
			population: cities[ort].population,
			state: cities[ort].state
		};
		ausgabe.push(newElem);
	});
	return ausgabe;
};

const outputMergedList = function(list) {
	list.forEach(element => {
		console.log(
			`Vorname: ${element.vorname}\nNachname: ${element.name}\nE-Mail: ${element.email}\nWohnort: ${element.wohnort}\nEinwohner: ${element.population}\nBundesland: ${element.state}\n`
		);
	});
};

module.exports = {
	readJSON,
	search,
	deleteCity,
	addCity,
	mergeUserCity,
	outputMergedList
};
