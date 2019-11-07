

//Einbinden von readline Module
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

//Initialisieren von Bewertungs Werten
const max_rating = 5;
var rating_count = 16;
var rating = 4.6;

//Funktion zur Ausgabe der Bewertung
const current_rating = function() {
	console.log(
		"Bewertung: " + rating.toFixed(2) + " bei " + rating_count + " Bewertungen"
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
		console.log("Current Rating: " + random);
		current_rating();
	}
};

//Funktion zum Hinzufügen der neuen Bewertung
const add_rating = function(new_rating) {
	if (new_rating > max_rating || new_rating < 0) {
		error("Die Bewertung sollte zwischen 0 und " + max_rating + " liegen");
	} else {
		let current_rating_sum = rating_count * rating;
		rating_count += 1;
		current_rating_sum += parseFloat(new_rating);
		rating = current_rating_sum / rating_count;
	}
};

//Funktion Ausgabe error
const error = function(message) {
	console.error(message);
};
