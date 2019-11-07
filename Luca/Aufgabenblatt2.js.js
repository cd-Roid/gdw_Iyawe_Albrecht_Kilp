//Aufgabe 5
const hello = "hello";

function First() {
	let world = " World";
	world = hello + world;
	return world;
}

function Second() {
	const world = " World";
	hello = hello + world;
	return hello;
}

console.log(First(), Second());

//Einbinden von readline Module
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

//Initialisieren von Bewertungs Werten (0=Name, 1=max_rating, 2=rating_count, 3=rating, 4=last_rating)
//var rating = ["Bewertungen für App XY", 5, 16, 4.6, 0];

//Initialisieren von Bewertungs Objekt
function rating(name, max_rating, ratings) {
	this.name = name;
	this.max_rating = max_rating;
	this.ratings = ratings;
	this.average = () => ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
	this.rating_count = () => this.ratings.length;
}

var ratings = new rating("Bewertung für App XY", 5, [3, 5, 3, 2]);

//Funktion zur Ausgabe der Bewertung
const current_rating = function() {
	console.log(
		"Bewertung: " +
			ratings.average().toFixed(2) +
			" bei " +
			ratings.rating_count() +
			" Bewertungen. \nName der Bewertung: " +
			ratings.name +
			" Letzte Bewertung: " +
			ratings.ratings[ratings.rating_count() - 1]
	);
};

//Ausgabe bisheriger Bewertung
current_rating();

//Abfragen von Bewertung
rl.question("Wie oft soll die Funktion ausgefuehrt werden? ", function(answer) {
	add_rating_n(answer);
	rl.close();
});

//Funktion n mal ausführen
const add_rating_n = function(n) {
	for (i = 0; i < n; i++) {
		let random = Math.floor(Math.random() * 6);
		add_rating(random);
		current_rating();
	}
};

//Funktion zum Hinzufügen der neuen Bewertung
const add_rating = function(new_rating) {
	if (new_rating > ratings.max_rating || new_rating < 0) {
		error(
			"Die Bewertung sollte zwischen 0 und " + ratings.max_rating + " liegen"
		);
	} else {
		ratings.ratings.push(new_rating);
	}
};

//Funktion Ausgabe error
const error = function(message) {
	console.error(message);
};
