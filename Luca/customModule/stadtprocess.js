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
		if (element.stadt == string) {
			console.log(element);
		}
	});
};

const deleteStadt = function(string, array) {
	array.forEach(function(element, index, array) {
		if (element.stadt == string) {
			array.splice(index, 1);
		}
	});
	return array;
};

const addStadt = function(stadt, state, pop, array) {
	let newStadt = { stadt: stadt, state: state, pop: pop };
	array.push(newStadt);
	return array;
};

const mergeBenutzerStadt = function(benutzer, stadt) {
	var ausgabe = [];
	benutzer.forEach(element => {
		var ort = 0;
		for (i = 0; i < staedte.length; i++) {
			if (element.adresse == stadte[i].stadt) {
				ort = i;
				break;
			}
		}
		let newElem = {
			vorname: element.vorname,
			name: element.name,
			email: element.email,
			adresse: element.adresse,
			pop: staedte[ort].pop,
			state: staedte[ort].state
		};
		ausgabe.push(newElem);
	});
	return ausgabe;
};

const outputMergedList = function(list) {
	list.forEach(element => {
		console.log(
			`Vorname: ${element.vorname}\nNachname: ${element.name}\nE-Mail: ${element.email}\nAdresse: ${element.adresse}\nEinwohner: ${element.pop}\nBundesland: ${element.state}\n`
		);
	});
};

module.exports = {
	readJSON,
	search,
	deleteStadt,
	addStadt,
	mergeBenutzerStadt,
	outputMergedList
};
